import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IUtilsRepository } from "src/domain/utils/utils.repository";
import { Person } from "src/domain/work-items/person";
import { IPersonRepository } from "src/domain/work-items/person.repository";
import { Task } from "src/domain/work-items/tasks/task";
import { ITaskRepository } from "src/domain/work-items/tasks/task.repository";
import { SaveTaskCommand } from "./save-task.command";

@CommandHandler(SaveTaskCommand)
export class SaveTaskHandler implements ICommandHandler<SaveTaskCommand, Task> {

    constructor(
        private _personRepository: IPersonRepository,
        private _taskRepository: ITaskRepository,
        private _utilsRepository: IUtilsRepository,
    ) { }

    async execute(command: SaveTaskCommand): Promise<Task> {
        try {

            await this._utilsRepository.InsertLog(command.Url, `Start processing task:${command.Id} for database.`);

            let persons = await this.ManagePersons(command);

            let taskId = await this._taskRepository.GetIdByExternalId(command.Id);

            let task = !taskId ? await this.InsertTask(command) : await this.UpdateTask(taskId, command);

            if (command.AssignedTo) task.assignedTo = persons.find(item => item.externalId == command.AssignedTo.Id);

            await this._taskRepository.UpdateAssignedPerson(task.id, task)

            await this._taskRepository.DeleteComment(task.id);

            let commentsToInsert = command.Comments.map(item => item.ToComment())

            commentsToInsert.forEach(item => {
                item.user = persons.find(person => person.externalId == item.user.externalId);
            })

            if (commentsToInsert.length > 0) {
                task.comments = await this._taskRepository.InsertComment(task.id, commentsToInsert)
            }

            await this._utilsRepository.InsertLog(command.Url, `End processing task:${command.Id} for database.`);
            return task
        }
        catch (error) {

            this._utilsRepository.InsertErrorLog(command.Url, String(error))
            throw error
        }
    }
    async InsertTask(command: SaveTaskCommand) {

        let task = new Task({
            id: undefined, areaPath: command.AreaPath, teamProject: command.TeamProject,
            iterationPath: command.IterationPath, state: command.State,
            reason: command.Reason, assignedTo: null, title: command.Title,
            remainingWork: command.RemainingWork, originalEstimate: command.OriginalEstimate,
            completedWork: command.CompletedWork, activity: command.Activity, priority: command.Priority,
            description: command.Description, tags: command.Tags,
            userStory: null, url: command.Url, comments: [],
            pageUrl: command.PageUrl, externalId: command.Id,
            createdDate: new Date(command.CreatedDate),
            updatedDate: new Date(command.UpdatedDate)
        })

        task.id = await this._taskRepository.Insert(task, command.UserStoryParentId);

        return task;
    }
    async UpdateTask(taskId: number, command: SaveTaskCommand) {

        let task = new Task({
            id: taskId, areaPath: command.AreaPath, teamProject: command.TeamProject,
            iterationPath: command.IterationPath, state: command.State,
            reason: command.Reason, assignedTo: null, title: command.Title,
            remainingWork: command.RemainingWork, originalEstimate: command.OriginalEstimate,
            completedWork: command.CompletedWork, activity: command.Activity, priority: command.Priority,
            description: command.Description, tags: command.Tags,
            userStory: null, url: command.Url, comments: [],
            pageUrl: command.PageUrl, externalId: command.Id,
            createdDate: new Date(command.CreatedDate),
            updatedDate: new Date(command.UpdatedDate)
        })

        await this._taskRepository.Update(taskId, task, command.UserStoryParentId);

        return task;
    }

    private async ManagePersons(command: SaveTaskCommand) {

        let persons: Person[] = [];

        if (command.AssignedTo && command.AssignedTo.Id != "") {
            persons.push(
                command.AssignedTo.ToPerson()
            );
        }

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