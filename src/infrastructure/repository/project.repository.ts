import { Injectable } from "@nestjs/common";
import { Project } from "src/domain/projects/project";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { ProjectEntity } from "../entity/project.entity";

@Injectable()
export class ProjectRepository implements IProjectRepository {
    async UpdateAssignedPerson(id: number, project: Project): Promise<boolean> {
        let projectUpdate = await ProjectEntity.save({
            id: id,
            assignedTo: ((project.assignedTo != null) ? { id: project.assignedTo.id } : null)
        })
        return projectUpdate != null
    }
    async Insert(project: Project): Promise<number> {
        let projectInsert = await ProjectEntity.save({
            externalId: project.externalId,
            areaPath: project.areaPath,
            teamProject: project.teamProject,
            iterationPath: project.iterationPath,
            state: project.state,
            reason: project.reason,
            createdDate: project.createdDate,
            title: project.title,
            description: project.description,
            priority: project.priority,
            valueArea: project.valueArea,
            risk: project.risk,
            businessValue: project.businessValue,
            timeCriticality: project.timeCriticality,
            effort: project.effort,
            startDate: project.startDate,
            targetDate: project.targetDate,
            url: project.url,
            pageUrl: project.pageUrl,
            tags: project.tags,
        })
        return projectInsert.id;
    }
    async GetIdByExternalId(externalId: number): Promise<number> {
        return (await ProjectEntity.findOneBy({ externalId: externalId }))?.id
    }
    async Update(id: number, project: Project): Promise<boolean> {
        let projectUpdate = await ProjectEntity.save({
            id: id,
            externalId: project.externalId,
            areaPath: project.areaPath,
            teamProject: project.teamProject,
            iterationPath: project.iterationPath,
            state: project.state,
            reason: project.reason,
            createdDate: project.createdDate,
            title: project.title,
            description: project.description,
            priority: project.priority,
            valueArea: project.valueArea,
            risk: project.risk,
            businessValue: project.businessValue,
            timeCriticality: project.timeCriticality,
            effort: project.effort,
            startDate: project.startDate,
            targetDate: project.targetDate,
            url: project.url,
            pageUrl: project.pageUrl,
            tags: project.tags,
        })
        return projectUpdate != null
    }
}