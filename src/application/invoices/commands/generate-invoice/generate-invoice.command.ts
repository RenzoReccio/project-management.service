export class GenerateInvoiceCommand {

    month: number;
    year: number;
    projectId: number;
    pricePerHour: number;

    constructor(
        month: number,
        year: number,
        projectId: number,
        pricePerHour: number,
    ) {
        this.month = month;
        this.year = year;
        this.projectId = projectId;
        this.pricePerHour = pricePerHour;
    }
}
