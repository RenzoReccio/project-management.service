export class GetWorkItemsResponse {
    id: number;
    externalId: number;
    workItemType: string;
    title: string;
    state: string;
    valueArea: string;
    tags: string;
    items: GetWorkItemsResponse[];
    pageUrl: string;
    assignedTo: string;
    constructor(
        id: number,
        externalId: number,
        workItemType: string,
        title: string,
        state: string,
        valueArea: string,
        tags: string,
        items: GetWorkItemsResponse[],
        pageUrl: string,
        assignedTo: string
    ) {
        this.id = id
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