import { Project } from "src/domain/projects/project";
import { ProjectEntity } from "src/infrastructure/entity/project.entity";

export class ProjectMapper {
    public static mapProjectEntityToProject(projectEntity: ProjectEntity): Project {
        return new Project(projectEntity.id, projectEntity.title, projectEntity.description);
    }
}