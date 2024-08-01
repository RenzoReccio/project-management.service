export class UpdateProjectCommand {
    id: number;
    title: string;
    description: string;
    epicIds: number[];
    constructor(
        id: number,
        title: string,
        description: string,
        epicIds: number[]
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.epicIds = epicIds
    }
}