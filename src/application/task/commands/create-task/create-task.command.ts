export class CreateTaskCommand {
    Id: number
    AreaPath: string
    TeamProject: string
    IterationPath: string
    WorkItemType: string
    State: string
    Reason: string
    AssignedTo: AssignedTo
    Title: string
    RemainingWork: number
    OriginalEstimate: number
    CompletedWork: number
    Activity: string
    Priority: number
    Description: string
    Tags: string
    UserStoryParent: UserStoryParent
    Url: string
    Comments: Comment[]
    PageUrl: string
}

export class AssignedTo {
    DisplayName: string
    Id: string
    UniqueName: string
}

export class UserStoryParent {
    Id: number
    AreaPath: string
    TeamProject: string
    IterationPath: string
    WorkItemType: string
    State: string
    Reason: string
    AssignedTo: AssignedTo
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
    FeatureParent: FeatureParent
    Url: string
    Comments: Comment[]
    PageUrl: string
}


export class FeatureParent {
    Id: number
    AreaPath: string
    TeamProject: string
    IterationPath: string
    WorkItemType: string
    State: string
    Reason: string
    AssignedTo: AssignedTo
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
    ParentEpic: ParentEpic
    Comments: Comment[]
    PageUrl: string
}


export class ParentEpic {
    Id: number
    AreaPath: string
    TeamProject: string
    IterationPath: string
    WorkItemType: string
    State: string
    Reason: string
    AssignedTo: AssignedTo
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
    Comments: Comment[]
}

export class Comment {
    Date: string
    User: string
    UserUniqueName: string
    Text: string
}
