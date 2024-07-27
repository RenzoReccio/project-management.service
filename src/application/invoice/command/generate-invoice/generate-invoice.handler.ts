import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { GenerateInvoiceCommand } from "./generate-invoice.command";
import { Task } from "src/domain/tasks/task";
import { TaskRepository } from "src/infrastructure/repository/task.repository";
import { ITaskRepository } from "src/domain/tasks/task.repository";

@CommandHandler(GenerateInvoiceCommand)
export class GenerateInvoiceHandler implements ICommandHandler<GenerateInvoiceCommand, Task[]> {

    constructor(
        private _taskRepository: ITaskRepository
    ) { }
    async execute(command: GenerateInvoiceCommand): Promise<Task[]> {
        return await this._taskRepository.GetClosedTasks(command.month, command.year);
    }
}