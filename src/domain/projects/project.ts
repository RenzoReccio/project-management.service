import { User } from 'src/domain/users/user';
import { Comment } from '../comment/comment';

export class Project {
  id: number;
  areaPath: string;
  teamProject: string;
  iterationPath: string;
  workItemType: string;
  state: string;
  reason: string;
  assignedTo: User;
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

  constructor(
    id: number,
    areaPath: string,
    teamProject: string,
    iterationPath: string,
    workItemType: string,
    state: string,
    reason: string,
    assignedTo: User,
    createdDate: Date,
    title: string,
    description: string,
    priority: number,
    valueArea: string,
    risk: string,
    businessValue: number,
    timeCriticality: number,
    effort: number,
    startDate: Date,
    targetDate: Date,
    url: string,
    pageUrl: string,
    tags: string,
    comments: Comment[]
  ) {
    this.id = id;
    this.areaPath = areaPath;
    this.teamProject = teamProject;
    this.iterationPath = iterationPath;
    this.workItemType = workItemType;
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