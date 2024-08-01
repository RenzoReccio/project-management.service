import { User } from "src/domain/users/user";
import { Comment } from "../comment";
import { Epic } from "../epics/epic";

export class Feature {
    id: number;
    externalId: number;
    areaPath: string;
    teamProject: string;
    iterationPath: string;
    state: string;
    reason: string;
    assignedTo: User;
    createdDate: Date;
    title: string;
    priority: number;
    valueArea: string;
    risk: string;
    targetDate: Date;
    businessValue: number;
    timeCriticality: number;
    effort: number;
    startDate: Date;
    description: string;
    tags: string;
    epic: Epic;
    url: string;
    comments: Comment[];
    pageUrl: string;

    constructor({
        id,
        externalId,
        areaPath,
        teamProject,
        iterationPath,
        state,
        reason,
        assignedTo,
        createdDate,
        title,
        priority,
        valueArea,
        risk,
        targetDate,
        businessValue,
        timeCriticality,
        effort,
        startDate,
        description,
        tags,
        epic,
        url,
        comments,
        pageUrl,
    }: {
        id: number;
        externalId: number;
        areaPath: string;
        teamProject: string;
        iterationPath: string;
        state: string;
        reason: string;
        assignedTo: User;
        createdDate: Date;
        title: string;
        priority: number;
        valueArea: string;
        risk: string;
        targetDate: Date;
        businessValue: number;
        timeCriticality: number;
        effort: number;
        startDate: Date;
        description: string;
        tags: string;
        epic: Epic;
        url: string;
        comments: Comment[];
        pageUrl: string;
    }) {
        this.id = id;
        this.externalId = externalId;
        this.areaPath = areaPath;
        this.teamProject = teamProject;
        this.iterationPath = iterationPath;
        this.state = state;
        this.reason = reason;
        this.assignedTo = assignedTo;
        this.createdDate = createdDate;
        this.title = title;
        this.priority = priority;
        this.valueArea = valueArea;
        this.risk = risk;
        this.targetDate = targetDate;
        this.businessValue = businessValue;
        this.timeCriticality = timeCriticality;
        this.effort = effort;
        this.startDate = startDate;
        this.description = description;
        this.tags = tags;
        this.epic = epic;
        this.url = url;
        this.comments = comments;
        this.pageUrl = pageUrl;
    }
}
