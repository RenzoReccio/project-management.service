export class GetInvoiceByIdResponse {

    project: string;
    month: number;
    year: number;
    hours: number;
    pricePerHour: number;
    finalPrice: number;
    task: string;
    date: string;
    externalId: number;

    constructor(
        project: string,
        month: number,
        year: number,
        hours: number,
        pricePerHour: number,
        finalPrice: number,
        task: string,
        date: string,
        externalId: number
    ) {
        this.project = project
        this.month = month
        this.year = year
        this.hours = hours
        this.pricePerHour = pricePerHour
        this.finalPrice = finalPrice
        this.task = task
        this.date = date
        this.externalId = externalId
    }
}