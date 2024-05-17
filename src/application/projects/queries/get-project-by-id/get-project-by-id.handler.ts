import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProjectByIdQuery } from "./get-project-by-id.query";

@QueryHandler(GetProjectByIdQuery)
export class GetProjectByIdHandler implements IQueryHandler<GetProjectByIdQuery> {

    constructor() { }

    async execute(query: GetProjectByIdQuery): Promise<any> {

        return 'QUERY USE CASE'
    }
}