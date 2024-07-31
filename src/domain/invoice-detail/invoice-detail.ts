import { Invoice } from "../invoices/invoice";

export class InvoiceDetail {
    id: number;
    invoice: Invoice;
    dedicatedHours: number;
    externalId: number;
    taskDescription: string;
    date: Date;
    constructor(
        id: number,
        invoice: Invoice,
        dedicatedHours: number,
        externalId: number,
        taskDescription: string,
        date: Date
    ) {
        this.id = id
        this.invoice = invoice
        this.dedicatedHours = dedicatedHours
        this.externalId = externalId
        this.taskDescription = taskDescription
        this.date = date
    }
}