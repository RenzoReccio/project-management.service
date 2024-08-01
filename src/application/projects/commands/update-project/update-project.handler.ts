import { Project } from "src/domain/projects/project";
import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { IEpicRepository } from "src/domain/work-items/epics/epic.repository";
import { UpdateProjectCommand } from "./update-project.command";

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler implements ICommandHandler<UpdateProjectCommand, number> {

    constructor(
        private _projectRepository: IProjectRepository,
        private _epicRepository: IEpicRepository,

    ) { }
    async execute(command: UpdateProjectCommand): Promise<number> {
        let project = new Project(command.id, command.title, command.description);
        await this._projectRepository.Update(command.id, project);
        await this._epicRepository.UpdateProjectIdMany(project.id, command.epicIds);
        return project.id
    }
}