import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateTaskCommand } from "./create-task.command";
import { ITaskRepository } from "src/domain/tasks/task.repository";
import { Inject } from "@nestjs/common";
import { Task } from "src/domain/tasks/task";

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {

    constructor(
        @Inject('ITaskRepository') private taskRepository: ITaskRepository
    ) { }

    async execute(command: CreateTaskCommand): Promise<any> {
        let id = await this.taskRepository.GetIdByExternalId(command.Id)
        let task = new Task(id, command.AreaPath, command.TeamProject,
            command.IterationPath, command.WorkItemType, command.State,
            command.Reason, command.AssignedTo, command.Title, command.RemainingWork,
            command.OriginalEstimate, command.CompletedWork, command.Activity,
            command.Priority, command.Description, command.Tags,
            null, command.Url, null, command.PageUrl, command.Id
        )
        if (id) {
            this.taskRepository.Update(id, task)
        }
        else {
            id = await this.taskRepository.Insert(task)
        }

        return 'Create Project Use Case'
    }

}