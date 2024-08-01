import { AssignedToMessageDto, CommentMessageDto } from "./utils.dto"

export class EpicMessageDto {
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
    Description: string
    Priority: number
    ValueArea: string
    Risk: string
    BusinessValue: number
    TimeCriticality: number
    Effort: number
    StartDate: string
    TargetDate: string
    Url: string
    PageUrl: string
    Tags: string
    Comments: CommentMessageDto[]
}