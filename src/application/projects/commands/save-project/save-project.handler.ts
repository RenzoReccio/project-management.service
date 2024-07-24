import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SaveProjectCommand } from "./save-project.command";
import { Project } from "src/domain/projects/project";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { Person } from "src/domain/person/person";
import { IPersonRepository } from "src/domain/person/person.repository";
import { ICommentRepository } from "src/domain/comment/comment.repository";
import { IEventLogRepository } from "src/domain/event-log/event-log.repository";

@CommandHandler(SaveProjectCommand)
export class SaveProjectHandler implements ICommandHandler<SaveProjectCommand, Project> {

    constructor(
        private _projectRepository: IProjectRepository,
        private _personRepository: IPersonRepository,
        private _commentRepository: ICommentRepository,
        private _eventLogRepository: IEventLogRepository

    ) { }

    async execute(command: SaveProjectCommand): Promise<Project> {
        try {
            await this._eventLogRepository.InsertLog(command.Url, `Start processing Project:${command.Id} for database.`);

            let personsFromProject = await this.ManagePersons(command)
            let projectId = await this._projectRepository.GetIdByExternalId(command.Id);
            let project = !projectId ? await this.InsertProject(command) : await this.UpdateProject(projectId, command);
            if (command.AssignedTo) project.assignedTo = personsFromProject.find(item => item.externalId == command.AssignedTo.Id);

            await this._projectRepository.UpdateAssignedPerson(project.id, project)
            await this._commentRepository.DeleteFromProjectId(project.id);
            let commentsToInsert = command.Comments.map(item => item.ToComment())
            commentsToInsert.forEach(item => {
                item.user = personsFromProject.find(person => person.externalId == item.user.externalId);
            })
            project.comments = await this._commentRepository.InsertForProject(projectId, commentsToInsert)
            await this._eventLogRepository.InsertLog(command.Url, `End processing Project:${command.Id} for database.`);
            return project
        } catch (error) {
            this._eventLogRepository.InsertErrorLog(command.Url, String(error))
            throw error
        }
    }


    private async InsertProject(command: SaveProjectCommand): Promise<Project> {
        let project = new Project({
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
        project.id = await this._projectRepository.Insert(project);
        return project;
    }

    private async UpdateProject(projectId: number, command: SaveProjectCommand): Promise<Project> {
        let project = new Project({
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
        await this._projectRepository.Update(projectId, project);
        return project;
    }

    private async ManagePersons(command: SaveProjectCommand) {
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



