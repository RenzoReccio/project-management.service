import { FeatureMessageDto } from "./feature-message.dto"
import { AssignedToMessageDto, CommentMessageDto } from "./utils.dto"

export class UserStoryMessageDto {
    Id: number
    AreaPath: string
    TeamProject: string
    IterationPath: string
    WorkItemType: string
    State: string
    Reason: string
    AssignedTo: AssignedToMessageDto
    Title: string
    BoardColumn: string
    BoardColumnDone: boolean
    Priority: number
    ValueArea: string
    Risk: string
    KanbanColumn: string
    KanbanColumnDone: boolean
    Description: string
    AcceptanceCriteria: string
    Tags: string
    FeatureParent: FeatureMessageDto
    Url: string
    Comments: CommentMessageDto[]
    PageUrl: string
}