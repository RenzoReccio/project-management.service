import { Injectable } from "@nestjs/common";
import { Project } from "src/domain/projects/project";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { ProjectEntity } from "../entity/project.entity";
import { ProjectMapper } from "./mappers/project.mapper";

@Injectable()
export class ProjectRepository implements IProjectRepository {

    public async Get(): Promise<Project[]> {
        let result = await ProjectEntity.find();
        return result.map(item => ProjectMapper.mapProjectEntityToProject(item));
    }

    public async GetById(projectId: number): Promise<Project> {
        let result = await ProjectEntity.findOne({ where: { id: projectId } });
        return ProjectMapper.mapProjectEntityToProject(result)
    }

    public async Insert(project: Project): Promise<number> {
        let projectInsert = await ProjectEntity.save({
            title: project.title,
            description: project.description
        })

        return projectInsert.id
    }

    public async Update(projectId: number, project: Project): Promise<boolean> {
        let projectInsert = await ProjectEntity.save({
            id: projectId,
            title: project.title,
            description: project.description
        })

        return projectInsert.id > 0
    }

    public Delete(projectId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}