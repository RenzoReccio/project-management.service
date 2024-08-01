import { Comment } from "src/domain/work-items/comment";
import { Person } from "src/domain/work-items/person";

export class SaveTaskCommand {
    Id: number;
    AreaPath: string;
    TeamProject: string;
    IterationPath: string;
    WorkItemType: string;
    State: string;
    Reason: string;
    AssignedTo: AssignedToSaveTaskCommand;
    Title: string;
    RemainingWork: number;
    OriginalEstimate: number;
    CompletedWork: number;
    Activity: string;
    Priority: number;
    Description: string;
    Tags: string;
    UserStoryParentId: number;
    Url: string;
    Comments: CommentSaveTaskCommand[];
    PageUrl: string;
    CreatedDate: string;
    UpdatedDate: string;

    constructor(
        Id: number,
        AreaPath: string,
        TeamProject: string,
        IterationPath: string,
        WorkItemType: string,
        State: string,
        Reason: string,
        AssignedTo: AssignedToSaveTaskCommand,
        Title: string,
        RemainingWork: number,
        OriginalEstimate: number,
        CompletedWork: number,
        Activity: string,
        Priority: number,
        Description: string,
        Tags: string,
        UserStoryParentId: number,
        Url: string,
        Comments: CommentSaveTaskCommand[],
        PageUrl: string,
        CreatedDate: string,
        UpdatedDate: string,
    ) {
        this.Id = Id;
        this.AreaPath = AreaPath;
        this.TeamProject = TeamProject;
        this.IterationPath = IterationPath;
        this.WorkItemType = WorkItemType;
        this.State = State;
        this.Reason = Reason;
        this.AssignedTo = AssignedTo;
        this.Title = Title;
        this.RemainingWork = RemainingWork;
        this.OriginalEstimate = OriginalEstimate;
        this.CompletedWork = CompletedWork;
        this.Activity = Activity;
        this.Priority = Priority;
        this.Description = Description;
        this.Tags = Tags;
        this.UserStoryParentId = UserStoryParentId;
        this.Url = Url;
        this.Comments = Comments;
        this.PageUrl = PageUrl;
        this.CreatedDate = CreatedDate;
        this.UpdatedDate = UpdatedDate;
    }
}

export class AssignedToSaveTaskCommand {
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

export class CommentSaveTaskCommand {
    Date: string;
    Text: string;
    CreatedBy: AssignedToSaveTaskCommand;

    constructor(
        Date: string,
        Text: string,
        CreatedBy: AssignedToSaveTaskCommand,
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
