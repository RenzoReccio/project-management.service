
export class GenerateInvoiceCommand {
    month: number;
    year: number;
    constructor(month: number, year: number) {
        this.month = month;
        this.year = year;
    }
}