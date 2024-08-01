export class GetProjectByIdResponse {
    id: number;
    title: string;
    description: string;
    epics: GetProjectByIdEpicsResponse[]
    constructor(
        id: number,
        title: string,
        description: string,
        epics: GetProjectByIdEpicsResponse[]
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.epics = epics
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