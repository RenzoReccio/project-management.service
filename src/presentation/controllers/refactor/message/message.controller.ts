import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { SaveFeatureCommand, AssignedToSaveFeatureCommand, CommentSaveFeatureCommand } from "src/application/feature/commands/save-feature/save-feature.command";
import { SaveProjectCommand, AssignedToSaveProjectCommand, CommentSaveProjectCommand } from "src/application/projects/commands/save-project/save-project.command";
import { SaveTaskCommand, CommentSaveTaskCommand, AssignedToSaveTaskCommand } from "src/application/task/commands/save-task/save-task.command";
import { SaveUserStoryCommand, AssignedToSaveUserStoryCommand, CommentSaveUserStoryCommand } from "src/application/user-story/commands/save-user-story/save-user-story.command";
import { Project } from "src/domain/projects/project";
import { Task } from "src/domain/tasks/task";
import { UserStory } from "src/domain/user-story/user-story";
import { PubSubPipe } from "src/presentation/pipes/pubsub.pipe";
import { MessageTaskDto } from "./task-message.dto";
import { Feature } from "src/domain/feature/feature";
import { UserStoryRepository } from "src/infrastructure/repository/user-story.repository";
import { UserStoryMessageDto } from "./user-story-message.dto";
import { FeatureMessageDto } from "./feature-message.dto";
import { EpicMessageDto } from "./epic-message.dto";

@Controller('message')
export class MessageController {

    constructor(
        private _commandBus: CommandBus,
        private _queryBus: QueryBus,

    ) { }

    @Post('task')
    async saveTask(@Body(new PubSubPipe<MessageTaskDto>(MessageTaskDto)) taskDto: MessageTaskDto) {
        let projectDto = taskDto.UserStoryParent.FeatureParent.ParentEpic
        let projectCommand = new SaveProjectCommand(projectDto.Id, projectDto.AreaPath, projectDto.TeamProject,
            projectDto.IterationPath, projectDto.WorkItemType, projectDto.State, projectDto.Reason,
            projectDto.AssignedTo != null ? new AssignedToSaveProjectCommand(projectDto.AssignedTo.DisplayName, projectDto.AssignedTo.Id, projectDto.AssignedTo.UniqueName) : null,
            projectDto.CreatedDate, projectDto.Title, projectDto.Description, projectDto.Priority, projectDto.ValueArea,
            projectDto.Risk, projectDto.BusinessValue, projectDto.TimeCriticality, projectDto.Effort,
            projectDto.StartDate, projectDto.TargetDate, projectDto.Url, projectDto.PageUrl,
            projectDto.Tags, projectDto.Comments.map(item => {
                return new CommentSaveProjectCommand(item.Date, item.Text,
                    new AssignedToSaveProjectCommand(item.CreatedBy.DisplayName, item.CreatedBy.Id, item.CreatedBy.UniqueName)
                )
            })
        )
        let project = await this._commandBus.execute<SaveProjectCommand, Project>(projectCommand);
        let featureDto = taskDto.UserStoryParent.FeatureParent;
        let featureCommand = new SaveFeatureCommand(featureDto.Id, featureDto.AreaPath, featureDto.TeamProject,
            featureDto.IterationPath, featureDto.WorkItemType, featureDto.State, featureDto.Reason,
            featureDto.AssignedTo != null ? new AssignedToSaveFeatureCommand(featureDto.AssignedTo.DisplayName, featureDto.AssignedTo.Id, featureDto.AssignedTo.UniqueName) : null,
            featureDto.CreatedDate, featureDto.Title, featureDto.Priority, featureDto.ValueArea, featureDto.Risk, featureDto.TargetDate,
            featureDto.BusinessValue, featureDto.TimeCriticality, featureDto.Effort, featureDto.StartDate, featureDto.Description,
            featureDto.Tags, featureDto.Url, project.id, featureDto.Comments.map(item => {
                return new CommentSaveFeatureCommand(item.Date, item.Text,
                    new AssignedToSaveFeatureCommand(item.CreatedBy.DisplayName, item.CreatedBy.Id, item.CreatedBy.UniqueName)
                )
            }), featureDto.PageUrl
        );
        let feature = await this._commandBus.execute<SaveFeatureCommand, Feature>(featureCommand);
        let userStoryDto = taskDto.UserStoryParent;
        let userStoryCommand = new SaveUserStoryCommand(userStoryDto.Id, userStoryDto.AreaPath,
            userStoryDto.TeamProject, userStoryDto.IterationPath, userStoryDto.WorkItemType, userStoryDto.State,
            userStoryDto.Reason,
            userStoryDto.AssignedTo != null ? new AssignedToSaveUserStoryCommand(userStoryDto.AssignedTo.DisplayName, userStoryDto.AssignedTo.Id, userStoryDto.AssignedTo.UniqueName) : null,
            userStoryDto.Title, userStoryDto.BoardColumn, userStoryDto.BoardColumnDone, userStoryDto.Priority,
            userStoryDto.ValueArea, userStoryDto.Risk, userStoryDto.KanbanColumn, userStoryDto.KanbanColumnDone,
            userStoryDto.Description, userStoryDto.AcceptanceCriteria, userStoryDto.Tags, feature.id,
            userStoryDto.Url, userStoryDto.Comments.map(item => {
                return new CommentSaveUserStoryCommand(item.Date, item.Text,
                    new AssignedToSaveUserStoryCommand(item.CreatedBy.DisplayName, item.CreatedBy.Id, item.CreatedBy.UniqueName)
                )
            }),
            userStoryDto.PageUrl
        )
        let userStory = await this._commandBus.execute<SaveUserStoryCommand, UserStory>(userStoryCommand);
        let taskCommand = new SaveTaskCommand(taskDto.Id, taskDto.AreaPath, taskDto.TeamProject, taskDto.IterationPath,
            taskDto.WorkItemType, taskDto.State, taskDto.Reason,
            taskDto.AssignedTo != null ? new AssignedToSaveUserStoryCommand(taskDto.AssignedTo.DisplayName, taskDto.AssignedTo.Id, taskDto.AssignedTo.UniqueName) : null,
            taskDto.Title, taskDto.RemainingWork, taskDto.OriginalEstimate, taskDto.CompletedWork, taskDto.Activity,
            taskDto.Priority, taskDto.Description, taskDto.Tags, userStory.id, taskDto.Url, taskDto.Comments.map(item => {
                return new CommentSaveTaskCommand(item.Date, item.Text,
                    new AssignedToSaveTaskCommand(item.CreatedBy.DisplayName, item.CreatedBy.Id, item.CreatedBy.UniqueName)
                )
            }),
            taskDto.PageUrl, taskDto.CreatedDate, taskDto.UpdatedDate
        )
        let task = await this._commandBus.execute<SaveTaskCommand, Task>(taskCommand);
        return "Task saved"
    }

    @Post('userstory')
    async saveUserStory(@Body(new PubSubPipe<UserStoryMessageDto>(UserStoryMessageDto)) userStoryDto: UserStoryMessageDto) {
        let projectDto = userStoryDto.FeatureParent.ParentEpic
        let projectCommand = new SaveProjectCommand(projectDto.Id, projectDto.AreaPath, projectDto.TeamProject,
            projectDto.IterationPath, projectDto.WorkItemType, projectDto.State, projectDto.Reason,
            projectDto.AssignedTo != null ? new AssignedToSaveProjectCommand(projectDto.AssignedTo.DisplayName, projectDto.AssignedTo.Id, projectDto.AssignedTo.UniqueName) : null,
            projectDto.CreatedDate, projectDto.Title, projectDto.Description, projectDto.Priority, projectDto.ValueArea,
            projectDto.Risk, projectDto.BusinessValue, projectDto.TimeCriticality, projectDto.Effort,
            projectDto.StartDate, projectDto.TargetDate, projectDto.Url, projectDto.PageUrl,
            projectDto.Tags, projectDto.Comments.map(item => {
                return new CommentSaveProjectCommand(item.Date, item.Text,
                    new AssignedToSaveProjectCommand(item.CreatedBy.DisplayName, item.CreatedBy.Id, item.CreatedBy.UniqueName)
                )
            })
        )
        let project = await this._commandBus.execute<SaveProjectCommand, Project>(projectCommand);
        let featureDto = userStoryDto.FeatureParent;
        let featureCommand = new SaveFeatureCommand(featureDto.Id, featureDto.AreaPath, featureDto.TeamProject,
            featureDto.IterationPath, featureDto.WorkItemType, featureDto.State, featureDto.Reason,
            featureDto.AssignedTo != null ? new AssignedToSaveFeatureCommand(featureDto.AssignedTo.DisplayName, featureDto.AssignedTo.Id, featureDto.AssignedTo.UniqueName) : null,
            featureDto.CreatedDate, featureDto.Title, featureDto.Priority, featureDto.ValueArea, featureDto.Risk, featureDto.TargetDate,
            featureDto.BusinessValue, featureDto.TimeCriticality, featureDto.Effort, featureDto.StartDate, featureDto.Description,
            featureDto.Tags, featureDto.Url, project.id, featureDto.Comments.map(item => {
                return new CommentSaveFeatureCommand(item.Date, item.Text,
                    new AssignedToSaveFeatureCommand(item.CreatedBy.DisplayName, item.CreatedBy.Id, item.CreatedBy.UniqueName)
                )
            }), featureDto.PageUrl
        );
        let feature = await this._commandBus.execute<SaveFeatureCommand, Feature>(featureCommand);

        let userStoryCommand = new SaveUserStoryCommand(userStoryDto.Id, userStoryDto.AreaPath,
            userStoryDto.TeamProject, userStoryDto.IterationPath, userStoryDto.WorkItemType, userStoryDto.State,
            userStoryDto.Reason,
            userStoryDto.AssignedTo != null ? new AssignedToSaveUserStoryCommand(userStoryDto.AssignedTo.DisplayName, userStoryDto.AssignedTo.Id, userStoryDto.AssignedTo.UniqueName) : null,
            userStoryDto.Title, userStoryDto.BoardColumn, userStoryDto.BoardColumnDone, userStoryDto.Priority,
            userStoryDto.ValueArea, userStoryDto.Risk, userStoryDto.KanbanColumn, userStoryDto.KanbanColumnDone,
            userStoryDto.Description, userStoryDto.AcceptanceCriteria, userStoryDto.Tags, feature.id,
            userStoryDto.Url, userStoryDto.Comments.map(item => {
                return new CommentSaveUserStoryCommand(item.Date, item.Text,
                    new AssignedToSaveUserStoryCommand(item.CreatedBy.DisplayName, item.CreatedBy.Id, item.CreatedBy.UniqueName)
                )
            }),
            userStoryDto.PageUrl
        )
        let userStory = await this._commandBus.execute<SaveUserStoryCommand, UserStory>(userStoryCommand);
        return "User Story saved"
    }

    @Post('feature')
    async saveFeature(@Body(new PubSubPipe<FeatureMessageDto>(FeatureMessageDto)) featureDto: FeatureMessageDto) {
        let projectDto = featureDto.ParentEpic
        let projectCommand = new SaveProjectCommand(projectDto.Id, projectDto.AreaPath, projectDto.TeamProject,
            projectDto.IterationPath, projectDto.WorkItemType, projectDto.State, projectDto.Reason,
            projectDto.AssignedTo != null ? new AssignedToSaveProjectCommand(projectDto.AssignedTo.DisplayName, projectDto.AssignedTo.Id, projectDto.AssignedTo.UniqueName) : null,
            projectDto.CreatedDate, projectDto.Title, projectDto.Description, projectDto.Priority, projectDto.ValueArea,
            projectDto.Risk, projectDto.BusinessValue, projectDto.TimeCriticality, projectDto.Effort,
            projectDto.StartDate, projectDto.TargetDate, projectDto.Url, projectDto.PageUrl,
            projectDto.Tags, projectDto.Comments.map(item => {
                return new CommentSaveProjectCommand(item.Date, item.Text,
                    new AssignedToSaveProjectCommand(item.CreatedBy.DisplayName, item.CreatedBy.Id, item.CreatedBy.UniqueName)
                )
            })
        )
        let project = await this._commandBus.execute<SaveProjectCommand, Project>(projectCommand);

        let featureCommand = new SaveFeatureCommand(featureDto.Id, featureDto.AreaPath, featureDto.TeamProject,
            featureDto.IterationPath, featureDto.WorkItemType, featureDto.State, featureDto.Reason,
            featureDto.AssignedTo != null ? new AssignedToSaveFeatureCommand(featureDto.AssignedTo.DisplayName, featureDto.AssignedTo.Id, featureDto.AssignedTo.UniqueName) : null,
            featureDto.CreatedDate, featureDto.Title, featureDto.Priority, featureDto.ValueArea, featureDto.Risk, featureDto.TargetDate,
            featureDto.BusinessValue, featureDto.TimeCriticality, featureDto.Effort, featureDto.StartDate, featureDto.Description,
            featureDto.Tags, featureDto.Url, project.id, featureDto.Comments.map(item => {
                return new CommentSaveFeatureCommand(item.Date, item.Text,
                    new AssignedToSaveFeatureCommand(item.CreatedBy.DisplayName, item.CreatedBy.Id, item.CreatedBy.UniqueName)
                )
            }), featureDto.PageUrl
        );
        let feature = await this._commandBus.execute<SaveFeatureCommand, Feature>(featureCommand);
        return "Feature saved"
    }

    @Post('epic')
    async saveEpic(@Body(new PubSubPipe<FeatureMessageDto>(FeatureMessageDto)) epicDto: EpicMessageDto) {
        let projectDto = epicDto
        let projectCommand = new SaveProjectCommand(projectDto.Id, projectDto.AreaPath, projectDto.TeamProject,
            projectDto.IterationPath, projectDto.WorkItemType, projectDto.State, projectDto.Reason,
            projectDto.AssignedTo != null ? new AssignedToSaveProjectCommand(projectDto.AssignedTo.DisplayName, projectDto.AssignedTo.Id, projectDto.AssignedTo.UniqueName) : null,
            projectDto.CreatedDate, projectDto.Title, projectDto.Description, projectDto.Priority, projectDto.ValueArea,
            projectDto.Risk, projectDto.BusinessValue, projectDto.TimeCriticality, projectDto.Effort,
            projectDto.StartDate, projectDto.TargetDate, projectDto.Url, projectDto.PageUrl,
            projectDto.Tags, projectDto.Comments.map(item => {
                return new CommentSaveProjectCommand(item.Date, item.Text,
                    new AssignedToSaveProjectCommand(item.CreatedBy.DisplayName, item.CreatedBy.Id, item.CreatedBy.UniqueName)
                )
            })
        )
        let project = await this._commandBus.execute<SaveProjectCommand, Project>(projectCommand);

        return "Project saved"
    }
}