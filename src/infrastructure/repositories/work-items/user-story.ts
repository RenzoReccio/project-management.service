import { Injectable } from "@nestjs/common"
import { Comment } from "src/domain/work-items/comment"
import { UserStory } from "src/domain/work-items/user-story/user-story"
import { IUserStoryRepository } from "src/domain/work-items/user-story/user-story.repository"
import { FeatureEntity } from "src/infrastructure/entity/feature.entity"
import { PersonEntity } from "src/infrastructure/entity/person.entity"
import { UserStoryCommentEntity } from "src/infrastructure/entity/user-story-comment.entity"
import { UserStoryEntity } from "src/infrastructure/entity/user-story.entity"

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
            feature: { id: featureId } as FeatureEntity,
            url: userStory.url,
            pageUrl: userStory.pageUrl,
            externalId: userStory.externalId
        })

        return userStoryInsert.id
    }

    async GetIdByExternalId(externalId: number): Promise<number> {

        const result = await UserStoryEntity.findOneBy({ externalId: externalId })

        return result?.id
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
            feature: { id: featureId } as FeatureEntity,
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

    async InsertComment(userStoryId: number, comments: Comment[]): Promise<Comment[]> {

        let commentsMapped = comments.map(item => {
            let comment: UserStoryCommentEntity = {
                date: item.date,
                createdBy: { id: item?.user?.id } as PersonEntity,
                text: item.text,
                userStory: { id: userStoryId } as UserStoryEntity,
            } as UserStoryCommentEntity
            return comment
        })

        let commentsInsert = await UserStoryCommentEntity.save(commentsMapped)

        return commentsInsert.map(item => {
            return new Comment({ id: item.id, date: item.date, user: null, text: item.text })
        })
    }

    async DeleteComment(userStoryId: number): Promise<number> {

        const result = await UserStoryCommentEntity.delete({ userStory: { id: userStoryId } })

        return result.affected
    }
}