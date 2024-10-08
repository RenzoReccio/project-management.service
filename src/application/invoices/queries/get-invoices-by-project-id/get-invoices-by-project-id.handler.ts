import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { GetInvoiceByProjectIdQuery } from "./get-invoices-by-project-id.query";
import { Invoice } from "src/domain/invoices/invoice";
import { IInvoiceRepository } from "src/domain/invoices/invoice.repository";
import { GetInvoiceByProjectIdResponse } from "./get-invoices-by-project-id.response";

@QueryHandler(GetInvoiceByProjectIdQuery)
export class GetInvoiceByProjectIdHandler implements ICommandHandler<GetInvoiceByProjectIdQuery, GetInvoiceByProjectIdResponse[]> {

    constructor(
        private _invoiceRepository: IInvoiceRepository,

    ) { }
    async execute(query: GetInvoiceByProjectIdQuery): Promise<GetInvoiceByProjectIdResponse[]> {
        let invoices = await this._invoiceRepository.GetByProjectId(query.projectId);
        return invoices.map(this.InvoiceToInvoiceResponse)
    }

    private InvoiceToInvoiceResponse(invoice: Invoice) {
        return new GetInvoiceByProjectIdResponse(
            invoice.id,
            Number(invoice.pricePerHour ?? 0),
            invoice.createdDate,
            invoice.detailInvoice?.length,
            invoice.month,
            invoice.year
        )
    }
}