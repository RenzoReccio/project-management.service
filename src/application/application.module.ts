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
import { IEventLogRepository } from "src/domain/event-log/event-log.repository";
import { EventLogRepository } from "src/infrastructure/repository/event-log.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { EventLog, EventLogSchema } from "src/infrastructure/schema/event-log.schema";
import { GetEventLogHandler } from "./event-log/queries/get-event-logs/get-event-logs.query";
import { GenerateInvoiceHandler } from "./invoice/command/generate-invoice/generate-invoice.handler";
import { IInvoiceRepository } from "src/domain/invoice/invoice.repository";
import { InvoiceRepository } from "src/infrastructure/repository/invoice.repository";
import { IInvoiceDetailRepository } from "src/domain/invoice-detail/invoice-detail.repository";
import { InvoiceDetailRepository } from "src/infrastructure/repository/invoice-detail.repository";

export const CommandHandlers = [
    CreateProjectHandler,
    SaveProjectHandler,
    SaveFeatureHandler,
    SaveUserStoryHandler,
    SaveTaskHandler,
    GenerateInvoiceHandler
]
export const QueryHandlers = [
    GetProjectsHandler,
    GetTaskHandler,
    GetEventLogHandler,
    GetProjectsHandler,
]

export const Providers: Provider[] = [
    { provide: ITaskRepository, useClass: TaskRepository },
    { provide: IProjectRepository, useClass: ProjectRepository },
    { provide: ICommentRepository, useClass: CommentRepository },
    { provide: IPersonRepository, useClass: PersonRepository },
    { provide: IFeatureRepository, useClass: FeatureRepository },
    { provide: IUserStoryRepository, useClass: UserStoryRepository },
    { provide: ITaskRepository, useClass: TaskRepository },
    { provide: IEventLogRepository, useClass: EventLogRepository },
    { provide: IInvoiceRepository, useClass: InvoiceRepository },
    { provide: IInvoiceDetailRepository, useClass: InvoiceDetailRepository },
]
@Module({
    imports: [CqrsModule,
        MongooseModule.forFeature([{ name: EventLog.name, schema: EventLogSchema }])

    ],
    providers: [
        ...Providers,
        ...CommandHandlers,
        ...QueryHandlers,
    ]
})
export class ApplicationModule { }