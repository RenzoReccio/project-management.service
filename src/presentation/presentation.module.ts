import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from 'src/application/application.module';
import { InvoiceController } from './controllers/invoice.controller';
import { ProjectController } from './controllers/project/project.controller';
import { UserController } from './controllers/user.controller';
import { InfraestructureModule } from 'src/infrastructure/infrastructure.module';
import { TaskController } from './controllers/task/task.controller';
import { MessageController } from './controllers/message/message.controller';
import { EventLogController } from './controllers/event-log.controller';

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
