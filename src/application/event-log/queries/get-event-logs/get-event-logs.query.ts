import { IEventLogRepository } from "src/domain/event-log/event-log.repository";
import { GetEventLogQuery } from "./get-event-logs.handler";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetEventLogQuery)
export class GetEventLogHandler implements IQueryHandler<GetEventLogQuery> {

    constructor(
        private _eventLogRepository: IEventLogRepository
    ) { }

    async execute(query: GetEventLogQuery): Promise<any> {
        return await this._eventLogRepository.GetLogs(query.limit)
    }

}