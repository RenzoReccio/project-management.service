import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { IEpicRepository } from "src/domain/work-items/epics/epic.repository";
import { GetUnassignedEpicQuery } from "./get-unassigned-epic.query";
import { Epic } from "src/domain/work-items/epics/epic";
import { GetUnassignedEpicResponse } from "./get-unassigned-epic.response";

@QueryHandler(GetUnassignedEpicQuery)
export class GetUnassignedEpicHandler implements ICommandHandler<GetUnassignedEpicQuery, GetUnassignedEpicResponse[]> {

    constructor(
        private _epicRepository: IEpicRepository,
    ) { }
    async execute(query: GetUnassignedEpicQuery): Promise<GetUnassignedEpicResponse[]> {
        let epics = await this._epicRepository.GetWithProjectIdNull();
        return epics.map(item => this.mapEpicToGetUnassignedEpicResponse(item));
    }

    private mapEpicToGetUnassignedEpicResponse(epic: Epic) {
        return new GetUnassignedEpicResponse(epic.id, epic.externalId, epic.title, epic.pageUrl)
    }
}
