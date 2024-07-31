import { Injectable } from "@nestjs/common";
import { Project } from "src/domain/projects/project";
import { IProjectRepository } from "src/domain/projects/project.repository";

@Injectable()
export class ProjectRepository implements IProjectRepository {

    public Get(): Promise<Project[]> {
        throw new Error("Method not implemented.");
    }

    public GetById(projectId: number): Promise<Project> {
        throw new Error("Method not implemented.");
    }

    public Insert(project: Project): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public Update(projectId: number, project: Project): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public Delete(projectId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}