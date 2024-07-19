import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ITaskRepository } from "src/domain/tasks/task.repository";
import { GetTaskQuery } from "./get-task.query";

@QueryHandler(GetTaskQuery)
export class GetTaskHandler implements IQueryHandler<GetTaskQuery> {

    constructor(
        private taskRepository: ITaskRepository
    ) { }

    async execute(query: GetTaskQuery): Promise<any> {
        return await this.taskRepository.Get()
    }

}