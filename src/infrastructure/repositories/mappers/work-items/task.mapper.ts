import { Task } from "src/domain/work-items/tasks/task";
import { TaskEntity } from "src/infrastructure/entity/task.entity";
import { UserStoryMapper } from "./user-story.mapper";

export class TaskMapper {

    public static mapTaskEntityToTask(taskEntity: TaskEntity) {
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
            userStory: taskEntity.userStory ? UserStoryMapper.mapUserStoryEntityToUserStory(taskEntity.userStory) : null,
            url: taskEntity.url,
            comments: [],
            pageUrl: taskEntity.pageUrl,
            createdDate: taskEntity.createdDate,
            updatedDate: taskEntity.updatedDate
        });
    }
}