import { Controller, Delete, Get, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTaskQuery } from 'src/application/task/queries/get-task/get-task.query';
import { CustomResponse } from '../response/response.model';

@Controller('task')
export class TaskController {

    constructor(
        private _commandBus: CommandBus,
        private _queryBus: QueryBus,

    ) { }

    @Get('')
    async getTasks(): Promise<any> {
        return new CustomResponse<any>(
            "Get tasks",
            await this._queryBus.execute(new GetTaskQuery()),
            null
        )
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