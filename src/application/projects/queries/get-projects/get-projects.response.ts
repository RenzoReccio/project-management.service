export class GetProjectsResponse {
    id: number;
    title: string;
    createdDate: Date;
    state: string;
    constructor(
        id: number,
        title: string,
        createdDate: Date,
        state: string
    ) {
        this.id = id
        this.title = title
        this.createdDate = createdDate
        this.state = state
    }
}