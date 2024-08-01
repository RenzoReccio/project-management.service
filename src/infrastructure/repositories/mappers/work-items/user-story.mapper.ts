import { UserStory } from "src/domain/work-items/user-story/user-story";
import { UserStoryEntity } from "src/infrastructure/entity/user-story.entity";
import { FeatureMapper } from "./feature.mapper";
import { TaskMapper } from "./task.mapper";

export class UserStoryMapper {
    public static mapUserStoryEntityToUserStory(userStoryEntity: UserStoryEntity): UserStory {
        return new UserStory({
            id: userStoryEntity.id,
            externalId: userStoryEntity.externalId,
            areaPath: userStoryEntity.areaPath,
            teamProject: userStoryEntity.teamProject,
            iterationPath: userStoryEntity.iterationPath,
            state: userStoryEntity.state,
            reason: userStoryEntity.reason,
            assignedTo: null,
            title: userStoryEntity.title,
            boardColumn: userStoryEntity.boardColumn,
            boardColumnDone: userStoryEntity.boardColumnDone,
            priority: userStoryEntity.priority,
            valueArea: userStoryEntity.valueArea,
            risk: userStoryEntity.risk,
            kanbanColumn: userStoryEntity.kanbanColumn,
            kanbanColumnDone: userStoryEntity.kanbanColumnDone,
            description: userStoryEntity.description,
            acceptanceCriteria: userStoryEntity.acceptanceCriteria,
            tags: userStoryEntity.tags,
            feature: userStoryEntity.feature ? FeatureMapper.mapFeatureEntityToFeature(userStoryEntity.feature) : null,
            url: userStoryEntity.url,
            comments: [],
            pageUrl: userStoryEntity.pageUrl,
            tasks: userStoryEntity.tasks ? userStoryEntity.tasks.map(item => TaskMapper.mapTaskEntityToTask(item)) : []
        });
    }
}