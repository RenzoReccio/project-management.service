export class ProjectInformation {
    id: number;
    title: string;
    description: string;
    pricePerHour: number;
    createdDate: Date;
    workItems: WorkItems[]
    constructor(
        id: number,
        title: string,
        description: string,
        pricePerHour: number,
        createdDate: Date,
        workItems: WorkItems[]
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.pricePerHour = pricePerHour
        this.createdDate = createdDate
        this.workItems = workItems
    }
}
export class WorkItems {
    externalId: number;
    workItemType: string;
    title: string;
    state: string;
    valueArea: string;
    tags: string;
    items: WorkItems[];
    pageUrl: string;
    assignedTo: string;
    constructor(
        externalId: number,
        workItemType: string,
        title: string,
        state: string,
        valueArea: string,
        tags: string,
        items: WorkItems[],
        pageUrl: string,
        assignedTo: string
    ) {
        this.externalId = externalId
        this.workItemType = workItemType
        this.title = title
        this.state = state
        this.valueArea = valueArea
        this.tags = tags
        this.items = items
        this.pageUrl = pageUrl
        this.assignedTo = assignedTo
    }
}