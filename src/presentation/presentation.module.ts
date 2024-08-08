import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from 'src/application/application.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { InvoiceController } from './controllers/invoice.controller';
import { ProjectController } from './controllers/project.controller';
import { UtilsController } from './controllers/utils.controller';
import { WorkItemController } from './controllers/work-item.controller';
import { PersonController } from './controllers/person.controller';
import { EvaluationController } from './controllers/evaluation.controller';

@Module({
    imports: [
        CqrsModule,
        InfrastructureModule,
        ApplicationModule
    ],
    controllers: [
        InvoiceController,
        ProjectController,
        WorkItemController,
        UtilsController,
        PersonController,
        EvaluationController
    ],
    providers: [],
})

export class PresentationModule { }
