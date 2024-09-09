export class GetInvoicesResponse {
    id: number;
    projectName: string;
    pricePerHour: number;
    createdDate: Date;
    countTask: number;
    month: number;
    year: number;
    constructor(
        id: number,
        projectName: string,
        pricePerHour: number,
        createdDate: Date,
        countTask: number,
        month: number,
        year: number
    ) {
        this.id = id
        this.projectName = projectName
        this.pricePerHour = pricePerHour
        this.createdDate = createdDate
        this.countTask = countTask
        this.month = month
        this.year = year
    }
}