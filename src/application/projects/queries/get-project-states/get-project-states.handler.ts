import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { GetProjectStatesQuery } from "./get-project-states.query";
import { ProjectState } from "src/domain/projects/project-state";

@QueryHandler(GetProjectStatesQuery)
export class GetProjectStatesHandler implements ICommandHandler<GetProjectStatesQuery, ProjectState[]> {

    constructor(
        private _projectRepository: IProjectRepository,
    ) { }
    async execute(query: GetProjectStatesQuery): Promise<ProjectState[]> {
        console.log(1)
        return await this._projectRepository.GetProjectStates();
    }
}