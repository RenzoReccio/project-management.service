import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UpdateOpenAIStoreEvent } from "./update-openai-store.event";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { Epic } from "src/domain/work-items/epics/epic";
import { Task } from "src/domain/work-items/tasks/task";
import { UserStory } from "src/domain/work-items/user-story/user-story";
import { ProjectInformation, WorkItems } from "src/domain/utils/project-information";
import { Feature } from "src/domain/work-items/features/feature";
import { Project } from "src/domain/projects/project";
import { IUtilsRepository } from "src/domain/utils/utils.repository";

@EventsHandler(UpdateOpenAIStoreEvent)
export class UpdateOpenAIStoreHandler implements IEventHandler<UpdateOpenAIStoreEvent> {

    constructor(
        private _projectRepository: IProjectRepository,
        private _utilsRepository: IUtilsRepository,

    ) { }
    async handle(event: UpdateOpenAIStoreEvent) {
        let result = await this._projectRepository.GetWithRelations();
        let projects = result.map(item => UpdateOpenAIMapper.mapProjectToProjectInformation(item));
        await this._utilsRepository.UploadJsonToOpenAI(projects);
    }
}

export class UpdateOpenAIMapper {
    static mapProjectToProjectInformation(project: Project) {

        return new ProjectInformation(
            project.id,
            project.title,
            project.description,
            project.pricePerHour,
            project.createdDate,
            project.epics?.map(UpdateOpenAIMapper.mapEpicToWorkItemResponse)
        )
    }

    private static mapFeatureToWorkItemResponse(feature: Feature) {
        return new WorkItems(feature.externalId, 'Feature', feature.title,
            feature.state, feature.valueArea, feature.tags,
            feature.userStories?.map(item => UpdateOpenAIMapper.mapUserStoryToWorkItemResponse(item)), feature.pageUrl,
            null
        )
    }

    private static mapEpicToWorkItemResponse(epic: Epic) {
        return new WorkItems(epic.externalId, 'Epic', epic.title,
            epic.state, epic.valueArea, epic.tags,
            epic.features?.map(UpdateOpenAIMapper.mapFeatureToWorkItemResponse), epic.pageUrl,
            null
        )
    }

    private static mapUserStoryToWorkItemResponse(userStory: UserStory) {
        return new WorkItems(userStory.externalId, 'User Story', userStory.title,
            userStory.state, userStory.valueArea, userStory.tags,
            userStory.tasks?.map(item => UpdateOpenAIMapper.mapTaskToWorkItemResponse(item)),
            userStory.pageUrl,
            null
        )
    }
    private static mapTaskToWorkItemResponse(task: Task) {
        return new WorkItems(task.externalId, 'Task', task.title,
            task.state, "", task.tags,
            undefined, task.pageUrl, task.assignedTo?.firstName
        )
    }
}