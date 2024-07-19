import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProjectsQuery } from "./get-projects.query";
import { IProjectRepository } from "src/domain/projects/project.repository";

@QueryHandler(GetProjectsQuery)
export class GetProjectsHandler implements IQueryHandler<GetProjectsQuery> {
    constructor(
        private _projectRepository: IProjectRepository
    ) { }

    async execute(query: GetProjectsQuery): Promise<any> {
        return await this._projectRepository.Get()
    }

}