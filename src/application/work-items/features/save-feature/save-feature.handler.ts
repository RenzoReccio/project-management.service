import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IUtilsRepository } from "src/domain/utils/utils.repository";
import { Feature } from "src/domain/work-items/features/feature";
import { IFeatureRepository } from "src/domain/work-items/features/feature.repository";
import { Person } from "src/domain/work-items/person";
import { IPersonRepository } from "src/domain/work-items/person.repository";
import { SaveFeatureCommand } from "./save-feature.command";

@CommandHandler(SaveFeatureCommand)
export class SaveFeatureHandler implements ICommandHandler<SaveFeatureCommand, Feature> {

    constructor(
        private _featureRepository: IFeatureRepository,
        private _personRepository: IPersonRepository,
        private _utilsRepository: IUtilsRepository
    ) { }

    async execute(command: SaveFeatureCommand): Promise<Feature> {
        try {

            await this._utilsRepository.InsertLog(command.Url, `Start processing Feature:${command.Id} for database.`);

            let persons = await this.ManagePersons(command);

            let featureId = await this._featureRepository.GetIdByExternalId(command.Id);

            let feature = !featureId ? await this.InsertFeature(command) : await this.UpdateFeature(featureId, command);

            await this._featureRepository.UpdateAssignedPerson(feature.id, feature)

            await this._featureRepository.DeleteComment(feature.id);

            let commentsToInsert = command.Comments.map(item => item.ToComment())

            commentsToInsert.forEach(item => {
                item.user = persons.find(person => person.externalId == item.user.externalId);
            })

            if (commentsToInsert.length > 0) {
                feature.comments = await this._featureRepository.InsertComment(feature.id, commentsToInsert)
            }
            await this._utilsRepository.InsertLog(command.Url, `End processing Feature:${command.Id} for database.`);

            return feature
        }

        catch (error) {
            this._utilsRepository.InsertErrorLog(command.Url, String(error))
            throw error
        }
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
            if (!savedPersons.find(item => item.externalId == element.externalId) && !personsToSave.find(item => item.externalId == element.externalId)) personsToSave.push(element)
        });

        await this._personRepository.InsertMany(personsToSave);

        return await this._personRepository.GetManyByExternalId(persons.map(item => item.externalId));
    }
}