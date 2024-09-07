export class UpdateProjectCommand {
    id: number;
    title: string;
    description: string;
    epicIds: number[];
    pricePerHour: number;
    assignedId: number;
    stateId: number;
    constructor(
        id: number,
        title: string,
        description: string,
        epicIds: number[],
        pricePerHour: number,
        assignedId: number,
        stateId: number
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.epicIds = epicIds
        this.pricePerHour = pricePerHour
        this.assignedId = assignedId
        this.stateId = stateId
    }
}