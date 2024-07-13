import { EpicMessageDto } from "./epic-message.dto"
import { AssignedToMessageDto, CommentMessageDto } from "./task-message.dto"

export class FeatureMessageDto {
    Id: number
    AreaPath: string
    TeamProject: string
    IterationPath: string
    WorkItemType: string
    State: string
    Reason: string
    AssignedTo: AssignedToMessageDto
    CreatedDate: string
    Title: string
    Priority: number
    ValueArea: string
    Risk: string
    TargetDate: string
    BusinessValue: number
    TimeCriticality: number
    Effort: number
    StartDate: string
    Description: string
    Tags: string
    Url: string
    ParentEpic: EpicMessageDto
    Comments: CommentMessageDto[]
    PageUrl: string
}