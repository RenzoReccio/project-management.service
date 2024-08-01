export class AssignedToMessageDto {
    Id: string
    DisplayName: string
    UniqueName: string
}

export class CommentMessageDto {
    Date: string
    Text: string
    CreatedBy: AssignedToMessageDto
}