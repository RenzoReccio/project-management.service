import { UserStoryMessageDto } from "./user-story-message.dto"
import { AssignedToMessageDto, CommentMessageDto } from "./utils.dto"

export class TaskMessageDto {
  Id: number
  AreaPath: string
  TeamProject: string
  IterationPath: string
  WorkItemType: string
  State: string
  Reason: string
  AssignedTo: AssignedToMessageDto
  Title: string
  RemainingWork: number
  OriginalEstimate: number
  CompletedWork: number
  Activity: string
  Priority: number
  Description: string
  Tags: string
  UserStoryParent: UserStoryMessageDto
  Url: string
  Comments: CommentMessageDto[]
  PageUrl: string
  CreatedDate: string
  UpdatedDate: string
}