import { Injectable } from "@nestjs/common";
import { UserStory } from "src/domain/user-story/user-story";
import { IUserStoryRepository } from "src/domain/user-story/user-story.repository";
import { UserStoryEntity } from "../entity/user-story.entity";
import { FeatureEntity } from "../entity/feature.entity";

@Injectable()
export class UserStoryRepository implements IUserStoryRepository {
    async Insert(userStory: UserStory, featureId: number): Promise<number> {
        let userStoryInsert = await UserStoryEntity.save({
            areaPath: userStory.areaPath,
            teamProject: userStory.teamProject,
            iterationPath: userStory.iterationPath,
            state: userStory.state,
            reason: userStory.reason,
            title: userStory.title,
            boardColumn: userStory.boardColumn,
            boardColumnDone: userStory.boardColumnDone,
            priority: userStory.priority,
            valueArea: userStory.valueArea,
            risk: userStory.risk,
            kanbanColumn: userStory.kanbanColumn,
            kanbanColumnDone: userStory.kanbanColumnDone,
            description: userStory.description,
            acceptanceCriteria: userStory.acceptanceCriteria,
            tags: userStory.tags,
            featureParent: { id: featureId } as FeatureEntity,
            url: userStory.url,
            pageUrl: userStory.pageUrl,
            externalId: userStory.externalId
        })
        return userStoryInsert.id
    }
    async GetIdByExternalId(externalId: number): Promise<number> {
        return (await UserStoryEntity.findOneBy({ externalId: externalId }))?.id
    }
    async Update(id: number, userStory: UserStory, featureId: number): Promise<boolean> {
        let userStoryInsert = await UserStoryEntity.save({
            id: id,
            areaPath: userStory.areaPath,
            teamProject: userStory.teamProject,
            iterationPath: userStory.iterationPath,
            state: userStory.state,
            reason: userStory.reason,
            title: userStory.title,
            boardColumn: userStory.boardColumn,
            boardColumnDone: userStory.boardColumnDone,
            priority: userStory.priority,
            valueArea: userStory.valueArea,
            risk: userStory.risk,
            kanbanColumn: userStory.kanbanColumn,
            kanbanColumnDone: userStory.kanbanColumnDone,
            description: userStory.description,
            acceptanceCriteria: userStory.acceptanceCriteria,
            tags: userStory.tags,
            featureParent: { id: featureId } as FeatureEntity,
            url: userStory.url,
            pageUrl: userStory.pageUrl,
            externalId: userStory.externalId
        })
        return userStoryInsert.id > 0
    }
    async UpdateAssignedPerson(id: number, userStory: UserStory): Promise<boolean> {
        let update = await UserStoryEntity.save({
            id: id,
            assignedTo: ((userStory.assignedTo != null) ? { id: userStory.assignedTo.id } : null)
        })
        return update != null
    }
}