export class SaveFeatureCommand {
    Id: number;
    AreaPath: string;
    TeamProject: string;
    IterationPath: string;
    WorkItemType: string;
    State: string;
    Reason: string;
    AssignedTo: AssignedToSaveFeatureCommand;
    CreatedDate: string;
    Title: string;
    Priority: number;
    ValueArea: string;
    Risk: string;
    TargetDate: string;
    BusinessValue: number;
    TimeCriticality: number;
    Effort: number;
    StartDate: string;
    Description: string;
    Tags: string;
    Url: string;
    ParentEpicId: number;
    Comments: CommentSaveFeatureCommand[];
    PageUrl: string;

    constructor(
        Id: number,
        AreaPath: string,
        TeamProject: string,
        IterationPath: string,
        WorkItemType: string,
        State: string,
        Reason: string,
        AssignedTo: AssignedToSaveFeatureCommand,
        CreatedDate: string,
        Title: string,
        Priority: number,
        ValueArea: string,
        Risk: string,
        TargetDate: string,
        BusinessValue: number,
        TimeCriticality: number,
        Effort: number,
        StartDate: string,
        Description: string,
        Tags: string,
        Url: string,
        ParentEpicId: number,
        Comments: CommentSaveFeatureCommand[],
        PageUrl: string,
    ) {
        this.Id = Id;
        this.AreaPath = AreaPath;
        this.TeamProject = TeamProject;
        this.IterationPath = IterationPath;
        this.WorkItemType = WorkItemType;
        this.State = State;
        this.Reason = Reason;
        this.AssignedTo = AssignedTo;
        this.CreatedDate = CreatedDate;
        this.Title = Title;
        this.Priority = Priority;
        this.ValueArea = ValueArea;
        this.Risk = Risk;
        this.TargetDate = TargetDate;
        this.BusinessValue = BusinessValue;
        this.TimeCriticality = TimeCriticality;
        this.Effort = Effort;
        this.StartDate = StartDate;
        this.Description = Description;
        this.Tags = Tags;
        this.Url = Url;
        this.ParentEpicId = ParentEpicId;
        this.Comments = Comments;
        this.PageUrl = PageUrl;
    }
}

export class AssignedToSaveFeatureCommand {
    DisplayName: string;
    Id: string;
    UniqueName: string;

    constructor(DisplayName: string, Id: string, UniqueName: string) {
        this.DisplayName = DisplayName;
        this.Id = Id;
        this.UniqueName = UniqueName;
    }
    ToPerson() {
        return new Person({
            id: undefined,
            firstName: this.DisplayName,
            lastName: "",
            externalId: this.Id,
            email: this.UniqueName,
        });
    }
}

export class CommentSaveFeatureCommand {
    Date: string;
    Text: string;
    CreatedBy: AssignedToSaveFeatureCommand;

    constructor(
        Date: string,
        Text: string,
        CreatedBy: AssignedToSaveFeatureCommand,
    ) {
        this.Date = Date;
        this.Text = Text;
        this.CreatedBy = CreatedBy;
    }

    ToComment() {
        return new Comment({
            id: undefined,
            date: new Date(this.Date),
            user: this.CreatedBy.ToPerson(),
            text: this.Text,
        });
    }
}