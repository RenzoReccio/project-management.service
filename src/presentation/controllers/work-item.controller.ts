import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { AssignedToSaveEpicCommand, CommentSaveEpicCommand, SaveEpicCommand } from "src/application/work-items/epics/save-epic/save-epic.command";
import { AssignedToSaveFeatureCommand, CommentSaveFeatureCommand, SaveFeatureCommand } from "src/application/work-items/features/save-feature/save-feature.command";
import { AssignedToSaveTaskCommand, CommentSaveTaskCommand, SaveTaskCommand } from "src/application/work-items/tasks/save-task/save-task.command";
import { AssignedToSaveUserStoryCommand, CommentSaveUserStoryCommand, SaveUserStoryCommand } from "src/application/work-items/user-story/save-user-story/save-user-story.command";
import { Epic } from "src/domain/work-items/epics/epic";
import { Feature } from "src/domain/work-items/features/feature";
import { Task } from "src/domain/work-items/tasks/task";
import { UserStory } from "src/domain/work-items/user-story/user-story";
import { EpicMessageDto } from "../dtos/epic-message.dto";
import { FeatureMessageDto } from "../dtos/feature-message.dto";
import { TaskMessageDto } from "../dtos/task-message.dto";
import { UserStoryMessageDto } from "../dtos/user-story-message.dto";
import { PubSubPipe } from "../pipes/pubsub.pipe";
import { GetWorkItemsQuery } from "src/application/work-items/get-work-items/get-work-items.query";
import { GetWorkItemsResponse } from "src/application/work-items/get-work-items/get-work-items.response";
import { CustomResponse } from "../dtos/response.model";
import { GetUnassignedEpicResponse } from "src/application/work-items/epics/get-unassigned-epic/get-unassigned-epic.response";
import { GetUnassignedEpicQuery } from "src/application/work-items/epics/get-unassigned-epic/get-unassigned-epic.query";
import { UpdateOpenAIStoreEvent } from "src/application/utils/events/update-openai-store/update-openai-store.event";

@Controller("work-item")
export class WorkItemController {

    constructor(
        private _commandBus: CommandBus,
        private _queryBus: QueryBus,
        private _eventBus: EventBus,

    ) { }

    @Get("project/:id")
    async getBackLog(@Param('id') id: string) {

        const query = new GetWorkItemsQuery(Number(id));
        let result = await this._queryBus.execute(query);
        return new CustomResponse<GetWorkItemsResponse[]>(
            `Get backlog for project: ${id}`,
            result,
            null
        )
    }

    @Get("epic/unassigned")
    async getepicUnassigned() {
        let result = await this._queryBus.execute(new GetUnassignedEpicQuery());
        return new CustomResponse<GetUnassignedEpicQuery[]>(
            `Get epics unassigned`,
            result,
            null
        )
    }

    @Post("task")
    async saveTask(@Body(new PubSubPipe<TaskMessageDto>(TaskMessageDto)) taskMessage: TaskMessageDto) {

        const epic = await this.executeSaveEpic(taskMessage.UserStoryParent.FeatureParent.ParentEpic)

        const feature = await this.executeSaveFeature(taskMessage.UserStoryParent.FeatureParent, epic.id)

        const userStory = await this.executeSaveUserStory(taskMessage.UserStoryParent, feature.id)

        const task = await this.executeSaveTask(taskMessage, userStory.id)

        this._eventBus.publish(new UpdateOpenAIStoreEvent())
        return "Task saved";
    }

    @Post("userstory")
    async saveUserStory(@Body(new PubSubPipe<UserStoryMessageDto>(UserStoryMessageDto)) userStoryMessage: UserStoryMessageDto) {

        const epic = await this.executeSaveEpic(userStoryMessage.FeatureParent.ParentEpic)

        const feature = await this.executeSaveFeature(userStoryMessage.FeatureParent, epic.id)

        const userStory = await this.executeSaveUserStory(userStoryMessage, feature.id)

        this._eventBus.publish(new UpdateOpenAIStoreEvent())

        return "User Story saved";
    }

    @Post("feature")
    async saveFeature(@Body(new PubSubPipe<FeatureMessageDto>(FeatureMessageDto)) featureMessage: FeatureMessageDto) {

        const epic = await this.executeSaveEpic(featureMessage.ParentEpic)

        const feature = await this.executeSaveFeature(featureMessage, epic.id)

        this._eventBus.publish(new UpdateOpenAIStoreEvent())

        return "Feature saved";
    }

    @Post("epic")
    async saveEpic(@Body(new PubSubPipe<EpicMessageDto>(FeatureMessageDto)) epicMessage: EpicMessageDto) {

        const epic = await this.executeSaveEpic(epicMessage)

        this._eventBus.publish(new UpdateOpenAIStoreEvent())

        return "Project saved";
    }

    private async executeSaveEpic(epicMessage: EpicMessageDto): Promise<Epic> {

        const command = new SaveEpicCommand(
            epicMessage.Id,
            epicMessage.AreaPath,
            epicMessage.TeamProject,
            epicMessage.IterationPath,
            epicMessage.WorkItemType,
            epicMessage.State,
            epicMessage.Reason,
            epicMessage.AssignedTo != null
                ? new AssignedToSaveEpicCommand(
                    epicMessage.AssignedTo.DisplayName,
                    epicMessage.AssignedTo.Id,
                    epicMessage.AssignedTo.UniqueName,
                )
                : null,
            epicMessage.CreatedDate,
            epicMessage.Title,
            epicMessage.Description,
            epicMessage.Priority,
            epicMessage.ValueArea,
            epicMessage.Risk,
            epicMessage.BusinessValue,
            epicMessage.TimeCriticality,
            epicMessage.Effort,
            epicMessage.StartDate,
            epicMessage.TargetDate,
            epicMessage.Url,
            epicMessage.PageUrl,
            epicMessage.Tags,
            epicMessage.Comments.map((item) => {
                return new CommentSaveEpicCommand(
                    item.Date,
                    item.Text,
                    new AssignedToSaveEpicCommand(
                        item.CreatedBy.DisplayName,
                        item.CreatedBy.Id,
                        item.CreatedBy.UniqueName,
                    ),
                );
            }),
        );

        const epic: Epic = await this._commandBus.execute(command)

        return epic
    }

    private async executeSaveFeature(featureMessage: FeatureMessageDto, epicId: number): Promise<Feature> {

        const command = new SaveFeatureCommand(
            featureMessage.Id,
            featureMessage.AreaPath,
            featureMessage.TeamProject,
            featureMessage.IterationPath,
            featureMessage.WorkItemType,
            featureMessage.State,
            featureMessage.Reason,
            featureMessage.AssignedTo != null
                ? new AssignedToSaveFeatureCommand(
                    featureMessage.AssignedTo.DisplayName,
                    featureMessage.AssignedTo.Id,
                    featureMessage.AssignedTo.UniqueName,
                )
                : null,
            featureMessage.CreatedDate,
            featureMessage.Title,
            featureMessage.Priority,
            featureMessage.ValueArea,
            featureMessage.Risk,
            featureMessage.TargetDate,
            featureMessage.BusinessValue,
            featureMessage.TimeCriticality,
            featureMessage.Effort,
            featureMessage.StartDate,
            featureMessage.Description,
            featureMessage.Tags,
            featureMessage.Url,
            epicId,
            featureMessage.Comments.map((item) => {
                return new CommentSaveFeatureCommand(
                    item.Date,
                    item.Text,
                    new AssignedToSaveFeatureCommand(
                        item.CreatedBy.DisplayName,
                        item.CreatedBy.Id,
                        item.CreatedBy.UniqueName,
                    ),
                );
            }),
            featureMessage.PageUrl,
        );

        const feature: Feature = await this._commandBus.execute(command)

        return feature
    }

    private async executeSaveUserStory(userStoryMessage: UserStoryMessageDto, featureId: number): Promise<UserStory> {

        const command = new SaveUserStoryCommand(
            userStoryMessage.Id,
            userStoryMessage.AreaPath,
            userStoryMessage.TeamProject,
            userStoryMessage.IterationPath,
            userStoryMessage.WorkItemType,
            userStoryMessage.State,
            userStoryMessage.Reason,
            userStoryMessage.AssignedTo != null
                ? new AssignedToSaveUserStoryCommand(
                    userStoryMessage.AssignedTo.DisplayName,
                    userStoryMessage.AssignedTo.Id,
                    userStoryMessage.AssignedTo.UniqueName,
                )
                : null,
            userStoryMessage.Title,
            userStoryMessage.BoardColumn,
            userStoryMessage.BoardColumnDone,
            userStoryMessage.Priority,
            userStoryMessage.ValueArea,
            userStoryMessage.Risk,
            userStoryMessage.KanbanColumn,
            userStoryMessage.KanbanColumnDone,
            userStoryMessage.Description,
            userStoryMessage.AcceptanceCriteria,
            userStoryMessage.Tags,
            featureId,
            userStoryMessage.Url,
            userStoryMessage.Comments.map((item) => {
                return new CommentSaveUserStoryCommand(
                    item.Date,
                    item.Text,
                    new AssignedToSaveUserStoryCommand(
                        item.CreatedBy.DisplayName,
                        item.CreatedBy.Id,
                        item.CreatedBy.UniqueName,
                    ),
                );
            }),
            userStoryMessage.PageUrl,
        );

        const userStory: UserStory = await this._commandBus.execute(command)

        return userStory
    }

    private async executeSaveTask(taskMessage: TaskMessageDto, userStoryId: number): Promise<Task> {

        const command = new SaveTaskCommand(
            taskMessage.Id,
            taskMessage.AreaPath,
            taskMessage.TeamProject,
            taskMessage.IterationPath,
            taskMessage.WorkItemType,
            taskMessage.State,
            taskMessage.Reason,
            taskMessage.AssignedTo != null
                ? new AssignedToSaveUserStoryCommand(
                    taskMessage.AssignedTo.DisplayName,
                    taskMessage.AssignedTo.Id,
                    taskMessage.AssignedTo.UniqueName,
                )
                : null,
            taskMessage.Title,
            taskMessage.RemainingWork,
            taskMessage.OriginalEstimate,
            taskMessage.CompletedWork,
            taskMessage.Activity,
            taskMessage.Priority,
            taskMessage.Description,
            taskMessage.Tags,
            userStoryId,
            taskMessage.Url,
            taskMessage.Comments.map((item) => {
                return new CommentSaveTaskCommand(
                    item.Date,
                    item.Text,
                    new AssignedToSaveTaskCommand(
                        item.CreatedBy.DisplayName,
                        item.CreatedBy.Id,
                        item.CreatedBy.UniqueName,
                    ),
                );
            }),
            taskMessage.PageUrl,
            taskMessage.CreatedDate,
            taskMessage.UpdatedDate,
        );

        const task: Task = await this._commandBus.execute(command)

        return task
    }
}
