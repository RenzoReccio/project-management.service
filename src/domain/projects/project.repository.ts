import { Project } from "./project";
import { ProjectState } from "./project-state";

export abstract class IProjectRepository {

    abstract Get(): Promise<Project[]>

    abstract GetWithRelations(): Promise<Project[]>
    
    abstract GetById(projectId: number): Promise<Project>

    abstract Insert(project: Project): Promise<number>;

    abstract Update(projectId: number, project: Project): Promise<boolean>;

    abstract Delete(projectId: number): Promise<boolean>;

    abstract GetProjectStates(): Promise<ProjectState[]>;

}