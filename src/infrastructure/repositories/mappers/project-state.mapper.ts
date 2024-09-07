import { ProjectState } from "src/domain/projects/project-state";
import { ProjectStateEntity } from "src/infrastructure/entity/project-state.entity";

export class ProjectStateMapper {
    public static mapProjectStateEntityToProjectState(projectstateEntity: ProjectStateEntity): ProjectState {
        return new ProjectState(projectstateEntity.id, projectstateEntity.name);
    }
}