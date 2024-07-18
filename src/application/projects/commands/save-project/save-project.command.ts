import { Comment } from "src/domain/comment/comment";
import { Person } from "src/domain/person/person";

export class SaveProjectCommand {
    Id: number;
    AreaPath: string;
    TeamProject: string;
    IterationPath: string;
    WorkItemType: string;
    State: string;
    Reason: string;
    AssignedTo: AssignedToSaveProjectCommand;
    CreatedDate: string;
    Title: string;
    Description: string;
    Priority: number;
    ValueArea: string;
    Risk: string;
    BusinessValue: number;
    TimeCriticality: number;
    Effort: number;
    StartDate: string;
    TargetDate: string;
    Url: string;
    PageUrl: string;
    Tags: string;
    Comments: CommentSaveProjectCommand[];

    constructor(
        Id: number,
        AreaPath: string,
        TeamProject: string,
        IterationPath: string,
        WorkItemType: string,
        State: string,
        Reason: string,
        AssignedTo: AssignedToSaveProjectCommand,
        CreatedDate: string,
        Title: string,
        Description: string,
        Priority: number,
        ValueArea: string,
        Risk: string,
        BusinessValue: number,
        TimeCriticality: number,
        Effort: number,
        StartDate: string,
        TargetDate: string,
        Url: string,
        PageUrl: string,
        Tags: string,
        Comments: CommentSaveProjectCommand[]
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
        this.Description = Description;
        this.Priority = Priority;
        this.ValueArea = ValueArea;
        this.Risk = Risk;
        this.BusinessValue = BusinessValue;
        this.TimeCriticality = TimeCriticality;
        this.Effort = Effort;
        this.StartDate = StartDate;
        this.TargetDate = TargetDate;
        this.Url = Url;
        this.PageUrl = PageUrl;
        this.Tags = Tags;
        this.Comments = Comments;
    }
}

export class AssignedToSaveProjectCommand {
    DisplayName: string;
    Id: string;
    UniqueName: string;

    constructor(DisplayName: string, Id: string, UniqueName: string) {
        this.DisplayName = DisplayName;
        this.Id = Id;
        this.UniqueName = UniqueName;
    }
    ToPerson() {
        return new Person({ id: undefined, firstName: this.DisplayName, lastName: "", externalId: this.Id, email: this.UniqueName })
    }
}

export class CommentSaveProjectCommand {
    Date: string;
    Text: string;
    CreatedBy: AssignedToSaveProjectCommand;

    constructor(Date: string, Text: string, CreatedBy: AssignedToSaveProjectCommand) {
        this.Date = Date;
        this.Text = Text;
        this.CreatedBy = CreatedBy;
    }

    ToComment() {
        return new Comment({ id: undefined, date: new Date(this.Date), user: this.CreatedBy.ToPerson(), text: this.Text })
    }
}