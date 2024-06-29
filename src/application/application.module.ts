import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateProjectHandler } from "./projects/commands/create-project/create-project.handler";
import { GetProjectsHandler } from "./projects/queries/get-projects/get-projects.handler";
import { CreateTaskHandler } from "./task/commands/create-task/create-task.handler";
import { ITaskRepository } from "src/domain/tasks/task.repository";
import { TaskRepository } from "src/infrastructure/repository/task.repository";
import { GetTaskHandler } from "./task/queries/get-task/get-task.handler";

export const CommandHandlers = [CreateProjectHandler, CreateTaskHandler]
export const QueryHandlers = [GetProjectsHandler, GetTaskHandler]

@Module({
    imports: [CqrsModule],
    providers: [
        {
            provide: ITaskRepository,
            useClass: TaskRepository,
        },
        ...CommandHandlers,
        ...QueryHandlers,
    ]
})
export class ApplicationModule { }