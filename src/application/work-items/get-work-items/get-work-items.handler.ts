import { CommandHandler, ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { GetWorkItemsResponse } from "./get-work-items.response";
import { IEpicRepository } from "src/domain/work-items/epics/epic.repository";
import { GetWorkItemsQuery } from "./get-work-items.query";
import { Epic } from "src/domain/work-items/epics/epic";
import { Feature } from "src/domain/work-items/features/feature";
import { UserStory } from "src/domain/work-items/user-story/user-story";
import { Task } from "src/domain/work-items/tasks/task";

@QueryHandler(GetWorkItemsQuery)
export class GetWorkItemsHandler implements ICommandHandler<GetWorkItemsQuery, GetWorkItemsResponse[]> {

    constructor(
        private _epicRepository: IEpicRepository,
    ) { }

    async execute(command: GetWorkItemsQuery): Promise<GetWorkItemsResponse[]> {
        let result = await this._epicRepository.GetBackLogByProjectId(command.projectId);
        let backlog = result.map(item => this.mapEpicToWorkItemResponse(item));
        return backlog
    }
    mapEpicToWorkItemResponse(epic: Epic) {
        return new GetWorkItemsResponse(epic.id, epic.externalId, 'Epic', epic.title,
            epic.state, epic.valueArea, epic.tags,
            epic.features.map(item => this.mapFeatureToWorkItemResponse(item)), epic.pageUrl,
            epic.assignedTo?.firstName
        )
    }

    mapFeatureToWorkItemResponse(feature: Feature) {
        return new GetWorkItemsResponse(feature.id, feature.externalId, 'Feature', feature.title,
            feature.state, feature.valueArea, feature.tags,
            feature.userStories.map(item => this.mapUserStoryToWorkItemResponse(item)), feature.pageUrl,
            feature.assignedTo?.firstName
        )
    }

    mapUserStoryToWorkItemResponse(userStory: UserStory) {
        return new GetWorkItemsResponse(userStory.id, userStory.externalId, 'User Story', userStory.title,
            userStory.state, userStory.valueArea, userStory.tags,
            userStory.tasks.map(item => this.mapTaskToWorkItemResponse(item)),
            userStory.pageUrl,
            userStory.assignedTo?.firstName
        )
    }
    mapTaskToWorkItemResponse(task: Task) {
        return new GetWorkItemsResponse(task.id, task.externalId, 'Task', task.title,
            task.state, "", task.tags,
            undefined, task.pageUrl,
            task.assignedTo?.firstName
        )
    }
}
