import { Task } from "src/domain/tasks/task";
import { SaveTaskCommand } from "./save-task.command";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ITaskRepository } from "src/domain/tasks/task.repository";
import { ICommentRepository } from "src/domain/comment/comment.repository";
import { IPersonRepository } from "src/domain/person/person.repository";
import { Person } from "src/domain/person/person";
import { IEventLogRepository } from "src/domain/event-log/event-log.repository";

@CommandHandler(SaveTaskCommand)
export class SaveTaskHandler implements ICommandHandler<SaveTaskCommand, Task> {
    constructor(
        private _personRepository: IPersonRepository,
        private _commentRepository: ICommentRepository,
        private _taskRepository: ITaskRepository,
        private _eventLogRepository: IEventLogRepository,
        
    ) { }
    async execute(command: SaveTaskCommand): Promise<Task> {
        try {
            await this._eventLogRepository.InsertLog(command.Url, `Start processing task:${command.Id} for database.`);
            let persons = await this.ManagePersons(command);
            let taskId = await this._taskRepository.GetIdByExternalId(command.Id);
            let task = !taskId ? await this.InsertUserStory(command) : await this.UpdateUserStory(taskId, command);
            await this._taskRepository.UpdateAssignedPerson(task.id, task)
            await this._commentRepository.DeleteFromTaskId(task.id);
            let commentsToInsert = command.Comments.map(item => item.ToComment())
            commentsToInsert.forEach(item => {
                item.user = persons.find(person => person.externalId == item.user.externalId);
            })
            if (commentsToInsert.length > 0) {
                task.comments = await this._commentRepository.InsertForTask(task.id, commentsToInsert)
            }
            await this._eventLogRepository.InsertLog(command.Url, `End processing task:${command.Id} for database.`);   
            return task
        } catch (error) {
            this._eventLogRepository.InsertErrorLog(command.Url, String(error))
            throw error
        }
    }
    async InsertUserStory(command: SaveTaskCommand) {
        let task = new Task({
            id: undefined, areaPath: command.AreaPath, teamProject: command.TeamProject,
            iterationPath: command.IterationPath, state: command.State,
            reason: command.Reason, assignedTo: null, title: command.Title,
            remainingWork: command.RemainingWork, originalEstimate: command.OriginalEstimate,
            completedWork: command.CompletedWork, activity: command.Activity, priority: command.Priority,
            description: command.Description, tags: command.Tags,
            userStoryParent: null, url: command.Url, comments: [],
            pageUrl: command.PageUrl, externalId: command.Id
        })
        task.id = await this._taskRepository.Insert(task, command.UserStoryParentId);
        return task;
    }
    async UpdateUserStory(taskId: number, command: SaveTaskCommand) {
        let task = new Task({
            id: taskId, areaPath: command.AreaPath, teamProject: command.TeamProject,
            iterationPath: command.IterationPath, state: command.State,
            reason: command.Reason, assignedTo: null, title: command.Title,
            remainingWork: command.RemainingWork, originalEstimate: command.OriginalEstimate,
            completedWork: command.CompletedWork, activity: command.Activity, priority: command.Priority,
            description: command.Description, tags: command.Tags,
            userStoryParent: null, url: command.Url, comments: [],
            pageUrl: command.PageUrl, externalId: command.Id
        })
        await this._taskRepository.Update(taskId, task, command.UserStoryParentId);
        return task;
    }


    private async ManagePersons(command: SaveTaskCommand) {
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