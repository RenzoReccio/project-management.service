import { Task } from "src/domain/tasks/task";
import { TaskEntity } from "src/infrastructure/entity/task.entity";
import { ITaskRepository } from "src/domain/tasks/task.repository";
import { Injectable } from "@nestjs/common";
import { UserStoryEntity } from "../entity/user-story.entity";

@Injectable()
export class TaskRepository implements ITaskRepository {
    async UpdateAssignedPerson(id: number, task: Task): Promise<boolean> {
        let update = await TaskEntity.save({
            id: id,
            assignedTo: ((task.assignedTo != null) ? { id: task.assignedTo.id } : null)
        })
        return update != null
    }
    async Get(): Promise<any> {
        return await TaskEntity.find({relations: ["assignedTo", ]})
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
        })
        return taskInsert.id
    }

}