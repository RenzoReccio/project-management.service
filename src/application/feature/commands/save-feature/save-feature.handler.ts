import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ICommentRepository } from "src/domain/comment/comment.repository";
import { IPersonRepository } from "src/domain/person/person.repository";
import { SaveFeatureCommand } from "./save-feature.command";
import { IFeatureRepository } from "src/domain/feature/feature.repository";
import { Person } from "src/domain/person/person";
import { Feature } from "src/domain/feature/feature";

@CommandHandler(SaveFeatureCommand)
export class SaveFeatureHandler implements ICommandHandler<SaveFeatureCommand, Feature> {

    constructor(
        private _featureRepository: IFeatureRepository,
        private _personRepository: IPersonRepository,
        private _commentRepository: ICommentRepository
    ) { }
    async execute(command: SaveFeatureCommand): Promise<Feature> {
        let persons = await this.ManagePersons(command);
        let featureId = await this._featureRepository.GetIdByExternalId(command.Id);
        let feature = !featureId ? await this.InsertFeature(command) : await this.UpdateFeature(featureId, command);
        await this._featureRepository.UpdateAssignedPerson(feature.id, feature)
        await this._commentRepository.DeleteFromFeatureId(feature.id);
        let commentsToInsert = command.Comments.map(item => item.ToComment())
        commentsToInsert.forEach(item => {
            item.user = persons.find(person => person.externalId == item.user.externalId);
        })
        if (commentsToInsert.length > 0) {
            feature.comments = await this._commentRepository.InsertForFeature(feature.id, commentsToInsert)
        }
        return feature
    }

    private async InsertFeature(command: SaveFeatureCommand) {
        let feature = new Feature({
            id: undefined, externalId: command.Id, areaPath: command.AreaPath,
            teamProject: command.TeamProject, iterationPath: command.IterationPath, state: command.State,
            reason: command.Reason, assignedTo: null,
            createdDate: new Date(command.CreatedDate), title: command.Title,
            priority: command.Priority, valueArea: command.ValueArea, risk: command.Risk,
            targetDate: new Date(command.TargetDate), businessValue: command.BusinessValue,
            timeCriticality: command.TimeCriticality, effort: command.Effort,
            startDate: new Date(command.StartDate), description: command.Description,
            tags: command.Tags, parentProject: null, url: command.Url, comments: [], pageUrl: command.PageUrl
        })
        feature.id = await this._featureRepository.Insert(feature, command.ParentEpicId);
        return feature;
    }
    private async UpdateFeature(featureId: number, command: SaveFeatureCommand) {
        let feature = new Feature({
            id: featureId, externalId: command.Id, areaPath: command.AreaPath,
            teamProject: command.TeamProject, iterationPath: command.IterationPath, state: command.State,
            reason: command.Reason, assignedTo: null,
            createdDate: new Date(command.CreatedDate), title: command.Title,
            priority: command.Priority, valueArea: command.ValueArea, risk: command.Risk,
            targetDate: new Date(command.TargetDate), businessValue: command.BusinessValue,
            timeCriticality: command.TimeCriticality, effort: command.Effort,
            startDate: new Date(command.StartDate), description: command.Description,
            tags: command.Tags, parentProject: null, url: command.Url, comments: [], pageUrl: command.PageUrl
        })
        await this._featureRepository.Update(featureId, feature, command.ParentEpicId);
        return feature;
    }
    private async ManagePersons(command: SaveFeatureCommand) {
        let persons: Person[] = [];
        if (command.AssignedTo) persons.push(
            command.AssignedTo.ToPerson()
        );
        command.Comments.forEach(comment => {
            persons.push(comment.CreatedBy.ToPerson());
        })
        let savedPersons = await this._personRepository.GetManyByExternalId(persons.map(item => item.externalId));
        let personsToSave: Person[] = [];
        persons.forEach(element => {
            if (!savedPersons.find(item => item.externalId == element.externalId) && !persons.find(item => item.externalId == element.externalId)) personsToSave.push(element)
        });
        await this._personRepository.InsertMany(personsToSave);
        return await this._personRepository.GetManyByExternalId(persons.map(item => item.externalId));
    }
}