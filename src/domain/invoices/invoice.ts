import { Project } from "../projects/project";
import { InvoiceDetail } from "./invoice-detail";

export class Invoice {
    
    id: number;
    project: Project;
    month: number;
    year: number;
    createdDate: Date;
    pricePerHour: number;
    detailInvoice: InvoiceDetail[];

    constructor(
        id: number,
        project: Project,
        month: number,
        year: number,
        createdDate: Date,
        pricePerHour: number,
        detailInvoice: InvoiceDetail[]
    ) {
        this.id = id
        this.project = project
        this.month = month
        this.year = year
        this.createdDate = createdDate
        this.pricePerHour = pricePerHour
        this.detailInvoice = detailInvoice
    }
}