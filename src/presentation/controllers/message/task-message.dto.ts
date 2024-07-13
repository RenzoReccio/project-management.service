import { UserStoryMessageDto } from "./user-story-message.dto"

export class MessageTaskDto {
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
}

export class AssignedToMessageDto {
  DisplayName: string
  Id: string
  UniqueName: string
}

export class CommentMessageDto {
  Date: string
  Text: string
  CreatedBy: AssignedToMessageDto
}

