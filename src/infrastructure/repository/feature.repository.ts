import { Injectable } from "@nestjs/common";
import { Project } from "src/domain/projects/project";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { ProjectEntity } from "../entity/project.entity";
import { IFeatureRepository } from "src/domain/feature/feature.repository";
import { Feature } from "src/domain/feature/feature";
import { FeatureEntity } from "../entity/feature.entity";

@Injectable()
export class FeatureRepository implements IFeatureRepository {
    async Insert(feature: Feature, projectId: number): Promise<number> {
        let featureSaved = await FeatureEntity.save({
            externalId: feature.externalId,
            areaPath: feature.areaPath,
            teamProject: feature.teamProject,
            iterationPath: feature.iterationPath,
            state: feature.state,
            reason: feature.reason,
            createdDate: feature.createdDate,
            title: feature.title,
            priority: feature.priority,
            valueArea: feature.valueArea,
            risk: feature.risk,
            targetDate: feature.targetDate,
            businessValue: feature.businessValue,
            timeCriticality: feature.timeCriticality,
            effort: feature.effort,
            startDate: feature.startDate,
            description: feature.description,
            tags: feature.tags,
            parentProject: { id: projectId } as ProjectEntity,
            url: feature.url,
            pageUrl: feature.pageUrl,
        })
        return featureSaved.id
    }
    async GetIdByExternalId(externalId: number): Promise<number> {
        return (await FeatureEntity.findOneBy({ externalId: externalId }))?.id
    }
    async Update(id: number, feature: Feature, projectId: number): Promise<boolean> {
        let featureSaved = await FeatureEntity.save({
            id: id,
            externalId: feature.externalId,
            areaPath: feature.areaPath,
            teamProject: feature.teamProject,
            iterationPath: feature.iterationPath,
            state: feature.state,
            reason: feature.reason,
            createdDate: feature.createdDate,
            title: feature.title,
            priority: feature.priority,
            valueArea: feature.valueArea,
            risk: feature.risk,
            targetDate: feature.targetDate,
            businessValue: feature.businessValue,
            timeCriticality: feature.timeCriticality,
            effort: feature.effort,
            startDate: feature.startDate,
            description: feature.description,
            tags: feature.tags,
            parentProject: { id: projectId } as ProjectEntity,
            url: feature.url,
            pageUrl: feature.pageUrl,
        })
        return featureSaved.id > 0
    }
    async UpdateAssignedPerson(id: number, feature: Feature): Promise<boolean> {
        let projectUpdate = await ProjectEntity.save({
            id: id,
            assignedTo: ((feature.assignedTo != null) ? { id: feature.assignedTo.id } : null)
        })
        return projectUpdate != null
    }
}