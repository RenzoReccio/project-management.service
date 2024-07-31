import { Project } from "./project";

export abstract class IProjectRepository {

    abstract Get(): Promise<Project[]>

    abstract GetById(projectId: number): Promise<Project>

    abstract Insert(project: Project): Promise<boolean>;

    abstract Update(projectId: number, project: Project): Promise<boolean>;

    abstract Delete(projectId: number): Promise<boolean>;

}