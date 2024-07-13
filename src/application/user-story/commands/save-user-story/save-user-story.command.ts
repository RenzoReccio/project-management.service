import { Comment } from "src/domain/comment/comment";
import { Person } from "src/domain/person/person";
export class SaveUserStoryCommand {
    Id: number;
    AreaPath: string;
    TeamProject: string;
    IterationPath: string;
    WorkItemType: string;
    State: string;
    Reason: string;
    AssignedTo: AssignedToSaveUserStoryCommand;
    Title: string;
    BoardColumn: string;
    BoardColumnDone: boolean;
    Priority: number;
    ValueArea: string;
    Risk: string;
    KanbanColumn: string;
    KanbanColumnDone: boolean;
    Description: string;
    AcceptanceCriteria: string;
    Tags: string;
    FeatureParentId: number;
    Url: string;
    Comments: CommentSaveUserStoryCommand[];
    PageUrl: string;

    constructor(
        Id: number,
        AreaPath: string,
        TeamProject: string,
        IterationPath: string,
        WorkItemType: string,
        State: string,
        Reason: string,
        AssignedTo: AssignedToSaveUserStoryCommand,
        Title: string,
        BoardColumn: string,
        BoardColumnDone: boolean,
        Priority: number,
        ValueArea: string,
        Risk: string,
        KanbanColumn: string,
        KanbanColumnDone: boolean,
        Description: string,
        AcceptanceCriteria: string,
        Tags: string,
        FeatureParentId: number,
        Url: string,
        Comments: CommentSaveUserStoryCommand[],
        PageUrl: string
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
        this.BoardColumn = BoardColumn;
        this.BoardColumnDone = BoardColumnDone;
        this.Priority = Priority;
        this.ValueArea = ValueArea;
        this.Risk = Risk;
        this.KanbanColumn = KanbanColumn;
        this.KanbanColumnDone = KanbanColumnDone;
        this.Description = Description;
        this.AcceptanceCriteria = AcceptanceCriteria;
        this.Tags = Tags;
        this.FeatureParentId = FeatureParentId;
        this.Url = Url;
        this.Comments = Comments;
        this.PageUrl = PageUrl;
    }
}


export class AssignedToSaveUserStoryCommand {
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

export class CommentSaveUserStoryCommand {
    Date: string;
    Text: string;
    CreatedBy: AssignedToSaveUserStoryCommand;

    constructor(Date: string, Text: string, CreatedBy: AssignedToSaveUserStoryCommand) {
        this.Date = Date;
        this.Text = Text;
        this.CreatedBy = CreatedBy;
    }

    ToComment() {
        return new Comment({ id: undefined, date: new Date(this.Date), user: this.CreatedBy.ToPerson(), text: this.Text })
    }
}
