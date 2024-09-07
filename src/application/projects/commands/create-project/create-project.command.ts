export class CreateProjectCommand {
    title: string;
    description: string;
    pricePerHour: number;
    epicIds: number[];
    assignedId: number;
    constructor(
        title: string,
        description: string,
        pricePerHour: number,
        epicIds: number[],
        assignedId: number
    ) {
        this.title = title
        this.description = description
        this.pricePerHour = pricePerHour
        this.epicIds = epicIds
        this.assignedId = assignedId
    }
}