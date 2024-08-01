import { User } from "src/domain/users/user";
import { Comment } from "../comment";
import { Feature } from "../features/feature";
import { Task } from "../tasks/task";

export class UserStory {
    id: number;
    areaPath: string;
    teamProject: string;
    iterationPath: string;
    state: string;
    reason: string;
    assignedTo: User;
    title: string;
    boardColumn: string;
    boardColumnDone: boolean;
    priority: number;
    valueArea: string;
    risk: string;
    kanbanColumn: string;
    kanbanColumnDone: boolean;
    description: string;
    acceptanceCriteria: string;
    tags: string;
    feature: Feature;
    url: string;
    comments: Comment[];
    pageUrl: string;
    externalId: number;
    tasks: Task[];
    constructor({
        id,
        externalId,
        areaPath,
        teamProject,
        iterationPath,
        state,
        reason,
        assignedTo,
        title,
        boardColumn,
        boardColumnDone,
        priority,
        valueArea,
        risk,
        kanbanColumn,
        kanbanColumnDone,
        description,
        acceptanceCriteria,
        tags,
        feature,
        url,
        comments,
        pageUrl,
        tasks,
    }: {
        id: number;
        externalId: number;
        areaPath: string;
        teamProject: string;
        iterationPath: string;
        state: string;
        reason: string;
        assignedTo: User;
        title: string;
        boardColumn: string;
        boardColumnDone: boolean;
        priority: number;
        valueArea: string;
        risk: string;
        kanbanColumn: string;
        kanbanColumnDone: boolean;
        description: string;
        acceptanceCriteria: string;
        tags: string;
        feature: Feature;
        url: string;
        comments: Comment[];
        pageUrl: string;
        tasks?: Task[]
    }) {

        this.id = id;
        this.externalId = externalId;
        this.areaPath = areaPath;
        this.teamProject = teamProject;
        this.iterationPath = iterationPath;
        this.state = state;
        this.reason = reason;
        this.assignedTo = assignedTo;
        this.title = title;
        this.boardColumn = boardColumn;
        this.boardColumnDone = boardColumnDone;
        this.priority = priority;
        this.valueArea = valueArea;
        this.risk = risk;
        this.kanbanColumn = kanbanColumn;
        this.kanbanColumnDone = kanbanColumnDone;
        this.description = description;
        this.acceptanceCriteria = acceptanceCriteria;
        this.tags = tags;
        this.feature = feature;
        this.url = url;
        this.comments = comments;
        this.pageUrl = pageUrl;
        this.tasks = tasks;
    }
}
