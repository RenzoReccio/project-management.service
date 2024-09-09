import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { Invoice } from "src/domain/invoices/invoice";
import { IInvoiceRepository } from "src/domain/invoices/invoice.repository";
import { GetInvoicesQuery } from "./get-invoices.query";
import { GetInvoicesResponse } from "./get-invoices.response";

@QueryHandler(GetInvoicesQuery)
export class GetInvoicesHandler implements ICommandHandler<GetInvoicesQuery, GetInvoicesResponse[]> {

    constructor(
        private _invoiceRepository: IInvoiceRepository,

    ) { }
    async execute(query: GetInvoicesQuery): Promise<GetInvoicesResponse[]> {
        let invoices = await this._invoiceRepository.Get();
        return invoices.map(this.InvoiceToInvoiceResponse)
    }

    private InvoiceToInvoiceResponse(invoice: Invoice) {
        return new GetInvoicesResponse(
            invoice.id,
            invoice.project.title,
            Number(invoice.pricePerHour ?? 0),
            invoice.createdDate,
            invoice.detailInvoice?.length,
            invoice.month,
            invoice.year
        )
    }
}