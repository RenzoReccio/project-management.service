import { Project } from "src/domain/projects/project";
import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { IEpicRepository } from "src/domain/work-items/epics/epic.repository";
import { GetProjectsQuery } from "./get-projects.query";
import { GetProjectsResponse } from "./get-projects.response";

@QueryHandler(GetProjectsQuery)
export class GetProjectsHandler implements ICommandHandler<GetProjectsQuery, GetProjectsResponse[]> {

    constructor(
        private _projectRepository: IProjectRepository,
    ) { }

    async execute(query: GetProjectsQuery): Promise<GetProjectsResponse[]> {
        let projects = await this._projectRepository.Get();
        return projects.map(this.mapProjectToGetProjectsResponse)
    }

    mapProjectToGetProjectsResponse(project: Project): GetProjectsResponse {
        return new GetProjectsResponse(
            project.id,
            project.title,
            project.createdDate,
            project.state?.name
        )
    }
}