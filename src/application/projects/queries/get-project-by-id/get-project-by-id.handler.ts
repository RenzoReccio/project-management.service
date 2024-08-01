import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { IEpicRepository } from "src/domain/work-items/epics/epic.repository";
import { GetProjectByIdQuery } from "./get-project-by-id.query";
import { GetProjectByIdEpicsResponse, GetProjectByIdResponse } from "./get-project-by-id.response";
import { Epic } from "src/domain/work-items/epics/epic";

@QueryHandler(GetProjectByIdQuery)
export class GetProjectByIdHandler implements ICommandHandler<GetProjectByIdQuery, GetProjectByIdResponse> {

    constructor(
        private _projectRepository: IProjectRepository,
        private _epicRepository: IEpicRepository,

    ) { }
    async execute(query: GetProjectByIdQuery): Promise<GetProjectByIdResponse> {
        let project = await this._projectRepository.GetById(query.id);
        let epics = await this._epicRepository.GetByProjectId(query.id);
        let resultEpics = epics.map(this.mapEpicToResultEpic)
        let resultProject = new GetProjectByIdResponse(project.id, project.title, project.description, resultEpics);
        return resultProject
    }

    mapEpicToResultEpic(epic: Epic) {
        return new GetProjectByIdEpicsResponse(
            epic.id,
            epic.externalId,
            epic.title,
            epic.pageUrl
        )
    }
}