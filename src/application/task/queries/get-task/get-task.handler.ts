import { CommandHandler, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ITaskRepository } from "src/domain/tasks/task.repository";
import { Inject } from "@nestjs/common";
import { GetTaskQuery } from "./get-task.query";

@QueryHandler(GetTaskQuery)
export class GetTaskHandler implements IQueryHandler<GetTaskQuery> {

    constructor(
        @Inject('ITaskRepository') private taskRepository: ITaskRepository
    ) { }

    async execute(query: GetTaskQuery): Promise<any> {
        return await this.taskRepository.Get()
    }

}