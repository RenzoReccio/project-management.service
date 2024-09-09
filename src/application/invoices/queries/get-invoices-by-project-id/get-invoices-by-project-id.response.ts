export class GetInvoiceByProjectIdResponse {
    id: number;
    pricePerHour: number;
    createdDate: Date;
    countTask: number;
    month: number;
    year: number;
    constructor(
        id: number,
        pricePerHour: number,
        createdDate: Date,
        countTask: number,
        month: number,
        year: number
    ) {
        this.id = id
        this.pricePerHour = pricePerHour
        this.createdDate = createdDate
        this.countTask = countTask
        this.month = month
        this.year = year
    }
}