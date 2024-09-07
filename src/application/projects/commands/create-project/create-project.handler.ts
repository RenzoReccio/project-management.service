import { Project } from "src/domain/projects/project";
import { CreateProjectCommand } from "./create-project.command";
import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { IEpicRepository } from "src/domain/work-items/epics/epic.repository";
import { ProjectState, ProjectStatesEnum } from "src/domain/projects/project-state";
import { Person } from "src/domain/work-items/person";

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler implements ICommandHandler<CreateProjectCommand, number> {

    constructor(
        private _projectRepository: IProjectRepository,
        private _epicRepository: IEpicRepository,

    ) { }
    async execute(command: CreateProjectCommand): Promise<number> {
        let project = new Project(
            null,
            command.title,
            command.description,
            command.pricePerHour,
            null,
            ProjectState.GetState(ProjectStatesEnum.Active),
            { id: command.assignedId } as Person
        );
        project.id = await this._projectRepository.Insert(project);
        await this._epicRepository.UpdateProjectIdMany(project.id, command.epicIds);
        return project.id
    }
}