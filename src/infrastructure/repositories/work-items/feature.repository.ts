import { Injectable } from "@nestjs/common";
import { Comment } from "src/domain/work-items/comment";
import { Feature } from "src/domain/work-items/features/feature";
import { IFeatureRepository } from "src/domain/work-items/features/feature.repository";
import { FeatureCommentEntity } from "src/infrastructure/entity/feature-comment.entity";
import { FeatureEntity } from "src/infrastructure/entity/feature.entity";
import { ProjectEntity } from "src/infrastructure/entity/project.entity";

@Injectable()
export class FeatureRepository implements IFeatureRepository {
    
    public async GetIdByExternalId(externalId: number): Promise<number> {
        return (await FeatureEntity.findOneBy({ externalId: externalId }))?.id;
    }

    public async Insert(feature: Feature, projectId: number): Promise<number> {
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
        });

        return featureSaved.id;
    }
    
    public async InsertComment(
        featureId: number,
        comments: Comment[],
    ): Promise<Comment[]> {
        
        let commentsMapped = comments.map((item) => {
            let comment: FeatureCommentEntity = {
                date: item.date,
                createdBy: { id: item?.user?.id } as PersonEntity,
                text: item.text,
                feature: { id: featureId } as FeatureEntity,
            } as FeatureCommentEntity;
            return comment;
        });

        let commentsInsert = await FeatureCommentEntity.save(commentsMapped);

        return commentsInsert.map((item) => {
            return new Comment({
                id: item.id,
                date: item.date,
                user: null,
                text: item.text,
            });
        });
    }

    public async Update(
        id: number,
        feature: Feature,
        projectId: number,
    ): Promise<boolean> {
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
        });

        return featureSaved.id > 0;
    }

    public async UpdateAssignedPerson(
        id: number,
        feature: Feature,
    ): Promise<boolean> {
        let projectUpdate = await FeatureEntity.save({
            id: id,
            assignedTo:
                feature.assignedTo != null ? { id: feature.assignedTo.id } : null,
        });

        return projectUpdate != null;
    }

    public async DeleteComment(featureId: number): Promise<number> {
        return (await FeatureCommentEntity.delete({ feature: { id: featureId } }))
            .affected;
    }
}
