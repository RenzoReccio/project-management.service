export class GetUnassignedEpicResponse {
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