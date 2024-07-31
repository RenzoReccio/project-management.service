import { Task } from "src/domain/tasks/task";
import { TaskEntity } from "src/infrastructure/entity/task.entity";
import { ITaskRepository } from "src/domain/tasks/task.repository";
import { Injectable } from "@nestjs/common";
import { UserStoryEntity } from "../entity/user-story.entity";

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

        return records.map(item => this.mapTaskEntityToTask(item));
    }

    private mapTaskEntityToTask(taskEntity: TaskEntity) {
        return new Task({
            id: taskEntity.id,
            externalId: taskEntity.externalId,
            areaPath: taskEntity.areaPath,
            teamProject: taskEntity.teamProject,
            iterationPath: taskEntity.iterationPath,
            state: taskEntity.state,
            reason: taskEntity.reason,
            assignedTo: null,
            title: taskEntity.title,
            remainingWork: taskEntity.remainingWork,
            originalEstimate: taskEntity.originalEstimate,
            completedWork: taskEntity.completedWork,
            activity: taskEntity.activity,
            priority: taskEntity.priority,
            description: taskEntity.description,
            tags: taskEntity.tags,
            userStoryParent: null,
            url: taskEntity.url,
            comments: [],
            pageUrl: taskEntity.pageUrl,
            createdDate: taskEntity.createdDate,
            updatedDate: taskEntity.updatedDate
        });
    }

    async UpdateAssignedPerson(id: number, task: Task): Promise<boolean> {
        let update = await TaskEntity.save({
            id: id,
            assignedTo: ((task.assignedTo != null) ? { id: task.assignedTo.id } : null)
        })
        return update != null
    }
    async Get(): Promise<any> {
        return await TaskEntity.find({ relations: ["assignedTo", "comments", "comments.createdBy"] })
    }
    async GetIdByExternalId(externalId: number): Promise<number> {
        return (await TaskEntity.findOneBy({ externalId: externalId }))?.id
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
            userStoryParent: { id: userStoryId } as UserStoryEntity,
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
            userStoryParent: { id: userStoryId } as UserStoryEntity,
            createdDate: task.createdDate,
            updatedDate: task.updatedDate,
            tags: task.tags
        })
        return taskInsert.id
    }

}