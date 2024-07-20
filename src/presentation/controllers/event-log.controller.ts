import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetEventLogQuery } from 'src/application/event-log/queries/get-event-logs/get-event-logs.handler';
import { CustomResponse } from './response/response.model';

@Controller('logevent')
export class EventLogController {

    constructor(
        private _queryBus: QueryBus,
    ) { }

    @Get(':limit')
    async getTasks(@Param('limit') limit: string): Promise<any> {
        return new CustomResponse<any>(
            "Get logevent",
            await this._queryBus.execute(new GetEventLogQuery(Number(limit))),
            null
        )
    }
}