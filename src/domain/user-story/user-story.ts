import { Comment } from "../comment/comment";
import { Feature } from "../feature/feature";
import { User } from "../users/user";

export class UserStory {
    id: number;
    areaPath: string;
    teamProject: string;
    iterationPath: string;
    workItemType: string;
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
    featureParent: Feature;
    url: string;
    comments: Comment[];
    pageUrl: string;
  
    constructor(
      id: number,
      areaPath: string,
      teamProject: string,
      iterationPath: string,
      workItemType: string,
      state: string,
      reason: string,
      assignedTo: User,
      title: string,
      boardColumn: string,
      boardColumnDone: boolean,
      priority: number,
      valueArea: string,
      risk: string,
      kanbanColumn: string,
      kanbanColumnDone: boolean,
      description: string,
      acceptanceCriteria: string,
      tags: string,
      featureParent: Feature,
      url: string,
      comments: Comment[],
      pageUrl: string
    ) {
      this.id = id;
      this.areaPath = areaPath;
      this.teamProject = teamProject;
      this.iterationPath = iterationPath;
      this.workItemType = workItemType;
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
      this.featureParent = featureParent;
      this.url = url;
      this.comments = comments;
      this.pageUrl = pageUrl;
    }
  }