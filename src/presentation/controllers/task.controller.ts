import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from 'src/application/task/commands/create-task/create-task.command';
import { PubSubPipe } from '../pipes/pubsub.pipe';
import { GetTaskQuery } from 'src/application/task/queries/get-task/get-task.query';
export interface PubSubRequest {
    message: Message
    subscription: string
}

export interface Message {
    data: string
    messageId: string
    message_id: string
    publishTime: string
    publish_time: string
}

@Controller('task')
export class TaskController {

    constructor(
        private _commandBus: CommandBus,
        private _queryBus: QueryBus,

    ) { }

    @Get('')
    async getTasks(): Promise<any> {
        return await this._queryBus.execute(new GetTaskQuery())
    }

    @Get()
    getTaskById(): string {

        return "I'm not a fool";
    }

    @Post('')
    async createTask(@Body(new PubSubPipe<CreateTaskCommand>(CreateTaskCommand)) command: CreateTaskCommand) {
        return this._commandBus.execute(command)
    }


    @Put()
    updateTask() { }

    @Delete()
    removeTask() { }
}