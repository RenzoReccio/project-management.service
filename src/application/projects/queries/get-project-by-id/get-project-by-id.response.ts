export class GetProjectByIdResponse {
    id: number;
    title: string;
    description: string;
    epics: GetProjectByIdEpicsResponse[]
    pricePerHour: number;
    assignedId: number;
    createdDate: Date;
    statusId: number;

    constructor(
        id: number,
        title: string,
        description: string,
        epics: GetProjectByIdEpicsResponse[],
        pricePerHour: number,
        assignedId: number,
        createdDate: Date,
        statusId: number
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.epics = epics
        this.pricePerHour = pricePerHour
        this.assignedId = assignedId
        this.createdDate = createdDate
        this.statusId = statusId
    }
}

export class GetProjectByIdEpicsResponse {
    id: number;
    externalId: number;
    title: string;
    pageUrl: string;
    constructor(
        id: number,
        externalId: number,
        title: string,
        pageUrl: string
    ) {
        this.id = id
        this.externalId = externalId
        this.title = title
        this.pageUrl = pageUrl
    }
} 