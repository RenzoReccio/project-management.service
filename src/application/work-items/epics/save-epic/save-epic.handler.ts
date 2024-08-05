import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IUtilsRepository } from "src/domain/utils/utils.repository";
import { Epic } from "src/domain/work-items/epics/epic";
import { IEpicRepository } from "src/domain/work-items/epics/epic.repository";
import { Person } from "src/domain/work-items/person";
import { IPersonRepository } from "src/domain/work-items/person.repository";
import { SaveEpicCommand } from "./save-epic.command";

@CommandHandler(SaveEpicCommand)
export class SaveEpicHandler implements ICommandHandler<SaveEpicCommand, Epic> {

    constructor(
        private _epicRepository: IEpicRepository,
        private _personRepository: IPersonRepository,
        private _utilsRepository: IUtilsRepository
    ) { }

    async execute(command: SaveEpicCommand): Promise<Epic> {
        try {

            await this._utilsRepository.InsertLog(command.Url, `Start processing Project:${command.Id} for database.`);

            let personsFromProject = await this.ManagePersons(command)

            let projectId = await this._epicRepository.GetIdByExternalId(command.Id);

            let project = !projectId ? await this.InsertEpic(command) : await this.UpdateEpic(projectId, command);

            if (command.AssignedTo) project.assignedTo = personsFromProject.find(item => item.externalId == command.AssignedTo.Id);

            await this._epicRepository.UpdateAssignedPerson(project.id, project)

            await this._epicRepository.DeleteComment(project.id);

            let commentsToInsert = command.Comments.map(item => item.ToComment())

            commentsToInsert.forEach(item => {
                item.user = personsFromProject.find(person => person.externalId == item.user.externalId);
            })

            project.comments = await this._epicRepository.InsertComment(projectId, commentsToInsert)

            await this._utilsRepository.InsertLog(command.Url, `End processing Project:${command.Id} for database.`);

            return project
        }
        catch (error) {
            this._utilsRepository.InsertErrorLog(command.Url, String(error))
            throw error
        }
    }

    private async InsertEpic(command: SaveEpicCommand): Promise<Epic> {

        let project = new Epic({
            id: undefined,
            externalId: command.Id, areaPath: command.AreaPath,
            teamProject: command.TeamProject,
            iterationPath: command.IterationPath,
            state: command.State, reason: command.Reason,
            assignedTo: null, createdDate: (new Date(command.CreatedDate)),
            title: command.Title, description: command.Description,
            priority: command.Priority, valueArea: command.ValueArea,
            risk: command.Risk, businessValue: command.BusinessValue,
            timeCriticality: command.TimeCriticality, effort: command.Effort,
            startDate: (new Date(command.StartDate)), targetDate: (new Date(command.TargetDate)),
            url: command.Url, pageUrl: command.PageUrl, tags: command.Tags, comments: []
        });

        project.id = await this._epicRepository.Insert(project);

        return project;
    }

    private async UpdateEpic(projectId: number, command: SaveEpicCommand): Promise<Epic> {

        let project = new Epic({
            id: projectId,
            externalId: command.Id, areaPath: command.AreaPath,
            teamProject: command.TeamProject,
            iterationPath: command.IterationPath,
            state: command.State, reason: command.Reason,
            assignedTo: null, createdDate: (new Date(command.CreatedDate)),
            title: command.Title, description: command.Description,
            priority: command.Priority, valueArea: command.ValueArea,
            risk: command.Risk, businessValue: command.BusinessValue,
            timeCriticality: command.TimeCriticality, effort: command.Effort,
            startDate: (new Date(command.StartDate)), targetDate: (new Date(command.TargetDate)),
            url: command.Url, pageUrl: command.PageUrl, tags: command.Tags, comments: []
        });

        await this._epicRepository.Update(projectId, project);

        return project;
    }

    private async ManagePersons(command: SaveEpicCommand) {

        let persons: Person[] = [];

        if (command.AssignedTo && command.AssignedTo.Id != "") persons.push(
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

