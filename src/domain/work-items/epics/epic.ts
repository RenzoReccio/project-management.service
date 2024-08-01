import { Comment } from "../comment";
import { Person } from "../person";

export class Epic {
    id: number;
    externalId: number;
    areaPath: string;
    teamProject: string;
    iterationPath: string;
    state: string;
    reason: string;
    assignedTo: Person;
    createdDate: Date;
    title: string;
    description: string;
    priority: number;
    valueArea: string;
    risk: string;
    businessValue: number;
    timeCriticality: number;
    effort: number;
    startDate: Date;
    targetDate: Date;
    url: string;
    pageUrl: string;
    tags: string;
    comments: Comment[];

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
        description,
        priority,
        valueArea,
        risk,
        businessValue,
        timeCriticality,
        effort,
        startDate,
        targetDate,
        url,
        pageUrl,
        tags,
        comments,
    }: {
        id: number;
        externalId: number;
        areaPath: string;
        teamProject: string;
        iterationPath: string;
        state: string;
        reason: string;
        assignedTo: Person;
        createdDate: Date;
        title: string;
        description: string;
        priority: number;
        valueArea: string;
        risk: string;
        businessValue: number;
        timeCriticality: number;
        effort: number;
        startDate: Date;
        targetDate: Date;
        url: string;
        pageUrl: string;
        tags: string;
        comments: Comment[];
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
        this.description = description;
        this.priority = priority;
        this.valueArea = valueArea;
        this.risk = risk;
        this.businessValue = businessValue;
        this.timeCriticality = timeCriticality;
        this.effort = effort;
        this.startDate = startDate;
        this.targetDate = targetDate;
        this.url = url;
        this.pageUrl = pageUrl;
        this.tags = tags;
        this.comments = comments;
    }
}
