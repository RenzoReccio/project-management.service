import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { Invoice } from "src/domain/invoices/invoice";
import { IInvoiceRepository } from "src/domain/invoices/invoice.repository";
import { GetInvoiceByIdQuery } from "./get-invoice-by-id.query";
import { GetInvoiceByIdResponse } from "./get-invoice-by-id.response";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { Project } from "src/domain/projects/project";
import { InvoiceDetail } from "src/domain/invoices/invoice-detail";

@QueryHandler(GetInvoiceByIdQuery)
export class GetInvoiceByIdQueryIdHandler implements ICommandHandler<GetInvoiceByIdQuery, GetInvoiceByIdResponse[]> {

    constructor(
        private _invoiceRepository: IInvoiceRepository,
        private _projectRepository: IProjectRepository,
    ) { }
    async execute(query: GetInvoiceByIdQuery): Promise<GetInvoiceByIdResponse[]> {

        let invoice = await this._invoiceRepository.GetById(query.id);

        let project = await this._projectRepository.GetById(invoice.project.id);

        let invoiceDetail = await this._invoiceRepository.GetDetailByInvoiceId(query.id);

        return invoiceDetail.map(item => this.mapGenerateInvoiceResponse(project, invoice, item));
    }

    private mapGenerateInvoiceResponse(
        project: Project,
        invoice: Invoice,
        invoiceDetail: InvoiceDetail,
    ) {

        const invoiceResponse = new GetInvoiceByIdResponse(
            project.title,
            invoice.month,
            invoice.year,
            invoiceDetail.dedicatedHours,
            invoice.pricePerHour,
            invoiceDetail.dedicatedHours * invoice.pricePerHour,
            invoiceDetail.taskDescription,
            this.formatDate(invoiceDetail.date),
            invoiceDetail.externalId
        );

        return invoiceResponse
    }


    private formatDate(date: Date) {
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        return this.addZeroes(dd) + "/" + this.addZeroes(mm) + "/" + yyyy;
    }

    private addZeroes(num: number) {
        if (num < 10) return "0" + num;
        return num.toString();
    }
}