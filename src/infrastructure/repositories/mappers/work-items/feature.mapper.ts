import { Feature } from "src/domain/work-items/features/feature";
import { FeatureEntity } from "src/infrastructure/entity/feature.entity";
import { EpicMapper } from "./epic.mapper";
import { UserStoryMapper } from "./user-story.mapper";

export class FeatureMapper {
    static mapFeatureEntityToFeature(featureEntity: FeatureEntity): Feature {
        return new Feature({
            id: featureEntity.id,
            externalId: featureEntity.externalId,
            areaPath: featureEntity.areaPath,
            teamProject: featureEntity.teamProject,
            iterationPath: featureEntity.iterationPath,
            state: featureEntity.state,
            reason: featureEntity.reason,
            assignedTo: null,
            createdDate: featureEntity.createdDate,
            title: featureEntity.title,
            priority: featureEntity.priority,
            valueArea: featureEntity.valueArea,
            risk: featureEntity.risk,
            targetDate: featureEntity.targetDate,
            businessValue: featureEntity.businessValue,
            timeCriticality: featureEntity.timeCriticality,
            effort: featureEntity.effort,
            startDate: featureEntity.startDate,
            description: featureEntity.description,
            tags: featureEntity.tags,
            epic: featureEntity.epic ? EpicMapper.mapEpicEntityToEpic(featureEntity.epic) : null,
            url: featureEntity.url,
            comments: [],
            pageUrl: featureEntity.pageUrl,
            userStories: featureEntity.userStories ? featureEntity.userStories.map(item => UserStoryMapper.mapUserStoryEntityToUserStory(item)) : []
        });
    }

}