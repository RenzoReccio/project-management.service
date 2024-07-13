import { Injectable } from "@nestjs/common";
import { Comment } from "src/domain/comment/comment";
import { ICommentRepository } from "src/domain/comment/comment.repository";
import { ProjectCommentEntity } from "../entity/project-comment.entity";
import { PersonEntity } from "../entity/person.entity";
import { ProjectEntity } from "../entity/project.entity";
import { FeatureCommentEntity } from "../entity/feature-comment.entity";
import { UserStoryCommentEntity } from "../entity/user-story-comment.entity";
import { FeatureEntity } from "../entity/feature.entity";
import { UserStoryEntity } from "../entity/user-story.entity";
import { TaskCommentEntity } from "../entity/task-comment.entity";
import { TaskEntity } from "../entity/task.entity";

@Injectable()
export class CommentRepository implements ICommentRepository {
    async DeleteFromTaskId(taskId: number): Promise<number> {
        return (await TaskCommentEntity.delete({ task: { id: taskId } })).affected
    }
    async InsertForTask(taskId: number, comments: Comment[]): Promise<Comment[]> {
        let commentsMapped = comments.map(item => {
            let comment: TaskCommentEntity = {
                date: item.date,
                createdBy: { id: item?.user?.id } as PersonEntity,
                text: item.text,
                task: { id: taskId } as TaskEntity,
            } as TaskCommentEntity
            return comment
        })
        let commentsInsert = await TaskCommentEntity.save(commentsMapped)
        return commentsInsert.map(item => {
            return new Comment({ id: item.id, date: item.date, user: null, text: item.text })
        })
    }
    async DeleteFromUserStoryId(userStoryId: number): Promise<number> {
        return (await UserStoryCommentEntity.delete({ userStory: { id: userStoryId } })).affected
    }
    async InsertForUserStory(userStoryId: number, comments: Comment[]): Promise<Comment[]> {
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
    async DeleteFromFeatureId(featureId: number): Promise<number> {
        return (await FeatureCommentEntity.delete({ feature: { id: featureId } })).affected
    }
    async InsertForFeature(featureId: number, comments: Comment[]): Promise<Comment[]> {
        let commentsMapped = comments.map(item => {
            let comment: FeatureCommentEntity = {
                date: item.date,
                createdBy: { id: item?.user?.id } as PersonEntity,
                text: item.text,
                feature: { id: featureId } as FeatureEntity,
            } as FeatureCommentEntity
            return comment
        })
        let commentsInsert = await FeatureCommentEntity.save(commentsMapped)
        return commentsInsert.map(item => {
            return new Comment({ id: item.id, date: item.date, user: null, text: item.text })
        })
    }
    async DeleteFromProjectId(projectId: number): Promise<number> {
        return (await ProjectCommentEntity.delete({ project: { id: projectId } })).affected
    }
    async InsertForProject(projectId: number, comments: Comment[]): Promise<Comment[]> {
        let commentsMapped = comments.map(item => {
            let comment: ProjectCommentEntity = {
                date: item.date,
                createdBy: { id: item?.user?.id } as PersonEntity,
                text: item.text,
                project: { id: projectId } as ProjectEntity,
            } as ProjectCommentEntity
            return comment
        })
        let commentsInsert = await ProjectCommentEntity.save(commentsMapped)
        return commentsInsert.map(item => {
            return new Comment({ id: item.id, date: item.date, user: null, text: item.text })
        })
    }
}