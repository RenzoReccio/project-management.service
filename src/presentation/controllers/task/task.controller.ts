import { Controller, Delete, Get, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTaskQuery } from 'src/application/task/queries/get-task/get-task.query';

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



    @Put()
    updateTask() { }

    @Delete()
    removeTask() { }
}