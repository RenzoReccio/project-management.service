import { Project } from "src/domain/projects/project";
import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { IEpicRepository } from "src/domain/work-items/epics/epic.repository";
import { GetProjectsQuery } from "./get-projects.query";

@QueryHandler(GetProjectsQuery)
export class GetProjectsHandler implements ICommandHandler<GetProjectsQuery, Project[]> {

    constructor(
        private _projectRepository: IProjectRepository,
        private _epicRepository: IEpicRepository,

    ) { }
    async execute(query: GetProjectsQuery): Promise<Project[]> {
        return await this._projectRepository.Get();
    }
}