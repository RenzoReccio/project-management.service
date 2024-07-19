import { Project } from "./project";

export abstract class IProjectRepository {
    abstract Insert(task: Project): Promise<number>;
    abstract GetIdByExternalId(externalId: number): Promise<number>;
    abstract Update(id: number, project: Project): Promise<boolean>;
    abstract UpdateAssignedPerson(id: number, project: Project): Promise<boolean>;
    abstract Get(): Promise<any>;
}