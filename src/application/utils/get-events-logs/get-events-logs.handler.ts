import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { EventLog } from "src/domain/utils/event-log";
import { IUtilsRepository } from "src/domain/utils/utils.repository";
import { GetEventsLogsQuery } from "./get-events-logs.query";

@QueryHandler(GetEventsLogsQuery)
export class GetEventsLogsHandler implements IQueryHandler<GetEventsLogsQuery> {

    constructor(
        private _utilsRepository: IUtilsRepository
    ) { }

    async execute(query: GetEventsLogsQuery): Promise<EventLog[]> {

        const result = await this._utilsRepository.GetLogs(query.limit)

        return result
    }
}