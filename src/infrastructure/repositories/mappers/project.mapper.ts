import { Project } from "src/domain/projects/project";
import { ProjectEntity } from "src/infrastructure/entity/project.entity";
import { ProjectStateMapper } from "./project-state.mapper";
import { PersonMapper } from "./person.mapper";

export class ProjectMapper {
    public static mapProjectEntityToProject(projectEntity: ProjectEntity): Project {
        return new Project(
            projectEntity.id,
            projectEntity.title,
            projectEntity.description,
            projectEntity.pricePerHour,
            projectEntity.createdDate,
            projectEntity.state ? ProjectStateMapper.mapProjectStateEntityToProjectState(projectEntity.state) : null,
            projectEntity.assigned ? PersonMapper.mapPersonEntityToPerson(projectEntity.assigned) : null
        );
    }
}