import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplicationModule } from 'src/application/application.module';
import { InvoiceController } from './controllers/invoice.controller';
import { ProjectController } from './controllers/project.controller';
import { TaskController } from './controllers/task.controller';
import { UserController } from './controllers/user.controller';

@Module({
    imports: [ApplicationModule, CqrsModule],
    controllers: [
        InvoiceController,
        ProjectController,
        TaskController,
        UserController
    ],
    providers: [],
})

export class PresentationModule { }
