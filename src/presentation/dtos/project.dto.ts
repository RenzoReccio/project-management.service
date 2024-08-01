export class CreateProjectDto {
    title: string;
    description: string;
    epicIds: number[];
}

export class UpdateProjectDto {
    title: string;
    description: string;
    epicIds: number[];
}