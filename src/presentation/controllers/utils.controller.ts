import { Controller, Get, Param } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetEventsLogsQuery } from "src/application/utils/queries/get-events-logs/get-events-logs.query";
import { EventLog } from "src/domain/utils/event-log";
import { CustomResponse } from "../dtos/response.model";

@Controller('utils')
export class UtilsController {

    constructor(
        private _commandBus: CommandBus,
        private _queryBus: QueryBus
    ) { }

    @Get(':limit')
    async getTasks(@Param('limit') limit: string): Promise<any> {

        const query = new GetEventsLogsQuery(Number(limit));

        const result: EventLog[] = await this._queryBus.execute(query)

        const response = new CustomResponse<EventLog[]>(
            "Get logs events",
            result,
            null
        )

        return response
    }
}