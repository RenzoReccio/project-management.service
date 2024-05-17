import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProjectsQuery } from "./get-projects.query";

@QueryHandler(GetProjectsQuery)
export class GetProjectsHandler implements IQueryHandler<GetProjectsQuery> {

    constructor() { }

    async execute(query: GetProjectsQuery): Promise<any> {
        return 'QUERY HANDLER USECASE GET PROJECTS'
    }
}