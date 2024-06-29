import { Task } from "src/domain/tasks/task";
import { Task as TaskEntity } from "src/infrastructure/entity/task.entity";
import { ITaskRepository } from "src/domain/tasks/task.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskRepository implements ITaskRepository {
    async Get(): Promise<any> {
        return await TaskEntity.find()
    }
    async GetIdByExternalId(externalId: number): Promise<number> {
        return (await TaskEntity.findOneBy({ externalId: externalId }))?.id
    }
    async Update(id: number, task: Task): Promise<boolean> {
        let insert = await TaskEntity.create(
            {
                id: id,
                externalId: task.id,
                areaPath: task.areaPath,
                teamProject: task.teamProject,
                iterationPath: task.iterationPath,
                workItemType: task.workItemType,
                state: task.state,
                reason: task.reason,
                displayName: task.assignedTo?.DisplayName,
                uniqueName: task.assignedTo?.UniqueName,
                title: task.title,
                description: task.description,
                priority: task.priority,
                remainingWork: task.remainingWork,
                originalEstimate: task.originalEstimate,
                completedWork: task.completedWork,
                activity: task.activity,
                url: task.url,
                pageUrl: task.pageUrl,
            }).save();
        return insert.id > 0
    }
    async Insert(task: Task): Promise<number> {
        let insert = await TaskEntity.create(
            {
                externalId: task.externalId,
                areaPath: task.areaPath,
                teamProject: task.teamProject,
                iterationPath: task.iterationPath,
                workItemType: task.workItemType,
                state: task.state,
                reason: task.reason,
                displayName: task.assignedTo?.DisplayName,
                uniqueName: task.assignedTo?.UniqueName,
                title: task.title,
                description: task.description,
                priority: task.priority,
                remainingWork: task.remainingWork,
                originalEstimate: task.originalEstimate,
                completedWork: task.completedWork,
                activity: task.activity,
                url: task.url,
                pageUrl: task.pageUrl,
            }).save();
        return insert.id
    }

}