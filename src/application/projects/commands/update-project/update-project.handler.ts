import { Project } from "src/domain/projects/project";
import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { IEpicRepository } from "src/domain/work-items/epics/epic.repository";
import { UpdateProjectCommand } from "./update-project.command";
import { ProjectState, ProjectStatesEnum } from "src/domain/projects/project-state";
import { Person } from "src/domain/work-items/person";
import { ValidationException } from "src/application/exceptions/validation.expection";

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler implements ICommandHandler<UpdateProjectCommand, number> {

    constructor(
        private _projectRepository: IProjectRepository,
        private _epicRepository: IEpicRepository,

    ) { }
    async execute(command: UpdateProjectCommand): Promise<number> {
        let validateProject = await this._projectRepository.GetById(command.id)
        if(!validateProject) throw new ValidationException("El proyecto indicado no existe.");
        if(validateProject.state.id === ProjectStatesEnum.Completed) throw new ValidationException("El proyecto indicado se encuentra cerrado y no se puede modificar.");
        let project = new Project(
            command.id,
            command.title,
            command.description,
            command.pricePerHour,
            null,
            { id: command.stateId } as ProjectState,
            { id: command.assignedId } as Person
        );
        await this._projectRepository.Update(command.id, project);
        await this._epicRepository.UpdateProjectIdMany(project.id, command.epicIds);
        return project.id
    }
}