export class CreateProjectCommand {
    title: string;
    description: string;
    epicIds: number[];
    constructor(title: string, description: string, epicIds: number[]) {
        this.title = title
        this.description = description
        this.epicIds = epicIds
    }
}