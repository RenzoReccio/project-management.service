import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { IInvoiceRepository } from "src/domain/invoices/invoice.repository";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { IUtilsRepository } from "src/domain/utils/utils.repository";
import { IEpicRepository } from "src/domain/work-items/epics/epic.repository";
import { IFeatureRepository } from "src/domain/work-items/features/feature.repository";
import { IPersonRepository } from "src/domain/work-items/person.repository";
import { ITaskRepository } from "src/domain/work-items/tasks/task.repository";
import { IUserStoryRepository } from "src/domain/work-items/user-story/user-story.repository";
import { InvoiceRepository } from "src/infrastructure/repositories/invoice.repository";
import { PersonRepository } from "src/infrastructure/repositories/person.repository";
import { ProjectRepository } from "src/infrastructure/repositories/project.repository";
import { UtilsRepository } from "src/infrastructure/repositories/utils.repository";
import { EpicRepository } from "src/infrastructure/repositories/work-items/epic.repository";
import { FeatureRepository } from "src/infrastructure/repositories/work-items/feature.repository";
import { TaskRepository } from "src/infrastructure/repositories/work-items/task.repository";
import { UserStoryRepository } from "src/infrastructure/repositories/work-items/user-story";
import { EventLog, EventLogSchema } from "src/infrastructure/schema/event-log.schema";
import { GenerateInvoiceHandler } from "./invoices/commands/generate-invoice/generate-invoice.handler";
import { GetEventsLogsHandler } from "./utils/get-events-logs/get-events-logs.handler";
import { SaveEpicHandler } from "./work-items/epics/save-epic/save-epic.handler";
import { SaveFeatureHandler } from "./work-items/features/save-feature/save-feature.handler";
import { SaveTaskHandler } from "./work-items/tasks/save-task/save-task.handler";
import { SaveUserStoryHandler } from "./work-items/user-story/save-user-story/save-user-story.handler";
import { GetWorkItemsHandler } from "./work-items/get-work-items/get-work-items.handler";
import { UpdateProjectHandler } from "./projects/commands/update-project/update-project.handler";
import { CreateProjectHandler } from "./projects/commands/create-project/create-project.handler";
import { GetProjectsHandler } from "./projects/queries/get-projects/get-projects.handler";
import { GetUnassignedEpicHandler } from "./work-items/epics/get-unassigned-epic/get-unassigned-epic.handler";
import { GetProjectByIdHandler } from "./projects/queries/get-project-by-id/get-project-by-id.handler";
import { GetInvoiceByProjectIdHandler } from "./invoices/queries/get-invoices-by-project-id/get-invoices-by-project-id.handler";
import { GetInvoiceByIdQueryIdHandler } from "./invoices/queries/get-invoice-by-id/get-invoice-by-id.handler";
import { GetPersonsHandler } from "./persons/queries/get-persons/get-persons.handler";
import { IEvaluationRepository } from "src/domain/evaluations/evaluation.repository";
import { EvaluationRepository } from "src/infrastructure/repositories/evaluation.repository";
import { CloseEvaluationHandler } from "./evaluation/commands/close-evaluation/close.evaluation.handler";
import { SaveEvaluationHandler } from "./evaluation/commands/save-evaluation/save-evaluation.handler";
import { GetEvaluationsHandler } from "./evaluation/queries/get-evaluations/get-evaluations.handler";
import { GetCurrentEvaluationHandler } from "./evaluation/queries/get-current-evaluation/get-current-evaluation.handler";
import { GetProjectStatesHandler } from "./projects/queries/get-project-states/get-project-states.handler";

export const CommandHandlers = [
    SaveEpicHandler,
    SaveFeatureHandler,
    SaveUserStoryHandler,
    SaveTaskHandler,
    GenerateInvoiceHandler,
    CreateProjectHandler,
    UpdateProjectHandler,
    CloseEvaluationHandler,
    SaveEvaluationHandler,
]

export const QueryHandlers = [
    GetEventsLogsHandler,
    GetWorkItemsHandler,
    GetProjectsHandler,
    GetUnassignedEpicHandler,
    GetProjectByIdHandler,
    GetInvoiceByProjectIdHandler,
    GetInvoiceByIdQueryIdHandler,
    GetPersonsHandler,
    GetEvaluationsHandler,
    GetCurrentEvaluationHandler,
    GetProjectStatesHandler
]

export const Providers: Provider[] = [
    { provide: IEpicRepository, useClass: EpicRepository },
    { provide: IFeatureRepository, useClass: FeatureRepository },
    { provide: IUserStoryRepository, useClass: UserStoryRepository },
    { provide: ITaskRepository, useClass: TaskRepository },
    { provide: IInvoiceRepository, useClass: InvoiceRepository },
    { provide: IProjectRepository, useClass: ProjectRepository },
    { provide: IPersonRepository, useClass: PersonRepository },
    { provide: IUtilsRepository, useClass: UtilsRepository },
    { provide: IProjectRepository, useClass: ProjectRepository },
    { provide: IEvaluationRepository, useClass: EvaluationRepository },
]

@Module({
    imports: [
        CqrsModule,
        MongooseModule.forFeature([{ name: EventLog.name, schema: EventLogSchema }])
    ],
    providers: [
        ...Providers,
        ...CommandHandlers,
        ...QueryHandlers,
    ]
})
export class ApplicationModule { }