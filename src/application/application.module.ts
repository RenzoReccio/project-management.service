import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateProjectHandler } from "./projects/commands/create-project/create-project.handler";
import { GetProjectsHandler } from "./projects/queries/get-projects/get-projects.handler";

export const CommandHandlers = [CreateProjectHandler]
export const QueryHandlers = [GetProjectsHandler]

@Module({
    imports: [CqrsModule],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers
    ]
})
export class ApplicationModule { }