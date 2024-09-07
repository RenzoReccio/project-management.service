export class CreateProjectDto {
    title: string;
    description: string;
    pricePerHour: number;
    epicIds: number[];
    assignedId: number;
}

export class UpdateProjectDto {
    title: string;
    description: string;
    epicIds: number[];
    pricePerHour: number;
    assignedId: number;
    stateId: number;
}