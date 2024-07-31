import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from 'src/application/application.module';
import { InvoiceController } from './controllers/refactor/invoice/invoice.controller';
import { ProjectController } from './controllers/refactor/project/project.controller';
import { UserController } from './controllers/refactor/user.controller';
import { InfraestructureModule } from 'src/infrastructure/infrastructure.module';
import { TaskController } from './controllers/refactor/task/task.controller';
import { MessageController } from './controllers/refactor/message/message.controller';
import { EventLogController } from './controllers/refactor/event-log.controller';

@Module({
    imports: [ApplicationModule, CqrsModule, InfraestructureModule],
    controllers: [
        InvoiceController,
        ProjectController,
        TaskController,
        UserController,
        MessageController,
        EventLogController
    ],
    providers: [],
})

export class PresentationModule { }
