import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetEventLogQuery } from 'src/application/event-log/queries/get-event-logs/get-event-logs.handler';

@Controller('logevent')
export class EventLogController {

    constructor(
        private _queryBus: QueryBus,
    ) { }

    @Get(':limit')
    async getTasks(@Param('limit') limit: string): Promise<any> {
        return await this._queryBus.execute(new GetEventLogQuery(Number(limit)))
    }
}