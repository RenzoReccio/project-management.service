import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateProjectHandler } from "./projects/commands/create-project/create-project.handler";
import { GetProjectsHandler } from "./projects/queries/get-projects/get-projects.handler";
import { ITaskRepository } from "src/domain/tasks/task.repository";
import { TaskRepository } from "src/infrastructure/repository/task.repository";
import { GetTaskHandler } from "./task/queries/get-task/get-task.handler";
import { SaveProjectHandler } from "./projects/commands/save-project/save-project.handler";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { ProjectRepository } from "src/infrastructure/repository/project.repository";
import { ICommentRepository } from "src/domain/comment/comment.repository";
import { CommentRepository } from "src/infrastructure/repository/comment.repository";
import { IPersonRepository } from "src/domain/person/person.repository";
import { PersonRepository } from "src/infrastructure/repository/person.repository";
import { FeatureRepository } from "src/infrastructure/repository/feature.repository";
import { IFeatureRepository } from "src/domain/feature/feature.repository";
import { SaveFeatureHandler } from "./feature/commands/save-feature/save-feature.handler";
import { SaveUserStoryHandler } from "./user-story/commands/save-user-story/save-user-story.handler";
import { IUserStoryRepository } from "src/domain/user-story/user-story.repository";
import { UserStoryRepository } from "src/infrastructure/repository/user-story.repository";
import { SaveTaskHandler } from "./task/commands/save-task/save-task.handler";

export const CommandHandlers = [
    CreateProjectHandler,
    SaveProjectHandler,
    SaveFeatureHandler,
    SaveUserStoryHandler,
    SaveTaskHandler
]
export const QueryHandlers = [GetProjectsHandler, GetTaskHandler]

export const Providers: Provider[] = [
    { provide: ITaskRepository, useClass: TaskRepository },
    { provide: IProjectRepository, useClass: ProjectRepository },
    { provide: ICommentRepository, useClass: CommentRepository },
    { provide: IPersonRepository, useClass: PersonRepository },
    { provide: IFeatureRepository, useClass: FeatureRepository },
    { provide: IUserStoryRepository, useClass: UserStoryRepository },
    { provide: ITaskRepository, useClass: TaskRepository },

]
@Module({
    imports: [CqrsModule],
    providers: [
        ...Providers,
        ...CommandHandlers,
        ...QueryHandlers,
    ]
})
export class ApplicationModule { }