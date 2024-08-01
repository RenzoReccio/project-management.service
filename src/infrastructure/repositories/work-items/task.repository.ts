import { Injectable } from "@nestjs/common";
import { Comment } from "src/domain/work-items/comment";
import { Task } from "src/domain/work-items/tasks/task";
import { ITaskRepository } from "src/domain/work-items/tasks/task.repository";
import { PersonEntity } from "src/infrastructure/entity/person.entity";
import { TaskCommentEntity } from "src/infrastructure/entity/task-comment.entity";
import { TaskEntity } from "src/infrastructure/entity/task.entity";
import { UserStoryEntity } from "src/infrastructure/entity/user-story.entity";
import { TaskMapper } from "../mappers/work-items/task.mapper";

@Injectable()
export class TaskRepository implements ITaskRepository {

    async GetClosedTasks(month: number, year: number): Promise<Task[]> {

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        const records = await TaskEntity.createQueryBuilder('entity')
            .where('entity.updatedDate >= :startDate', { startDate })
            .andWhere('entity.updatedDate <= :endDate', { endDate })
            .andWhere('entity.state = :statusTask', { statusTask: "Closed" })
            .getMany();

        return records.map(item => TaskMapper.mapTaskEntityToTask(item));
    }

    async UpdateAssignedPerson(id: number, task: Task): Promise<boolean> {

        let update = await TaskEntity.save({
            id: id,
            assignedTo: ((task.assignedTo != null) ? { id: task.assignedTo.id } : null)
        })

        return update != null
    }

    async Get(): Promise<any> {

        const result = await TaskEntity.find({ relations: ["assignedTo", "comments", "comments.createdBy"] })

        return result
    }

    async GetIdByExternalId(externalId: number): Promise<number> {

        const result = await TaskEntity.findOneBy({ externalId: externalId })
        return result?.id
    }

    async Update(id: number, task: Task, userStoryId: number): Promise<boolean> {

        let taskUpdate = await TaskEntity.save({
            id: id,
            externalId: task.externalId,
            areaPath: task.areaPath,
            teamProject: task.teamProject,
            iterationPath: task.iterationPath,
            state: task.state,
            reason: task.reason,
            title: task.title,
            description: task.description,
            priority: task.priority,
            remainingWork: task.remainingWork,
            originalEstimate: task.originalEstimate,
            completedWork: task.completedWork,
            activity: task.activity,
            url: task.url,
            pageUrl: task.pageUrl,
            userStory: { id: userStoryId } as UserStoryEntity,
            createdDate: task.createdDate,
            updatedDate: task.updatedDate,
            tags: task.tags
        })

        return taskUpdate.id > 0
    }

    async Insert(task: Task, userStoryId: number): Promise<number> {

        let taskInsert = await TaskEntity.save({
            externalId: task.externalId,
            areaPath: task.areaPath,
            teamProject: task.teamProject,
            iterationPath: task.iterationPath,
            state: task.state,
            reason: task.reason,
            title: task.title,
            description: task.description,
            priority: task.priority,
            remainingWork: task.remainingWork,
            originalEstimate: task.originalEstimate,
            completedWork: task.completedWork,
            activity: task.activity,
            url: task.url,
            pageUrl: task.pageUrl,
            userStory: { id: userStoryId } as UserStoryEntity,
            createdDate: task.createdDate,
            updatedDate: task.updatedDate,
            tags: task.tags
        })

        return taskInsert.id
    }

    async InsertComment(taskId: number, comments: Comment[]): Promise<Comment[]> {

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

    async DeleteComment(taskId: number): Promise<number> {

        const result = await TaskCommentEntity.delete({ task: { id: taskId } })

        return result.affected
    }
}