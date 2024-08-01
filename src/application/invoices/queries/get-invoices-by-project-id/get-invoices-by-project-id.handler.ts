import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { GetInvoiceByProjectIdQuery } from "./get-invoices-by-project-id.query";
import { Invoice } from "src/domain/invoices/invoice";
import { IInvoiceRepository } from "src/domain/invoices/invoice.repository";

@QueryHandler(GetInvoiceByProjectIdQuery)
export class GetInvoiceByProjectIdHandler implements ICommandHandler<GetInvoiceByProjectIdQuery, Invoice[]> {

    constructor(
        private _invoiceRepository: IInvoiceRepository,

    ) { }
    async execute(query: GetInvoiceByProjectIdQuery): Promise<Invoice[]> {
        return await this._invoiceRepository.GetByProjectId(query.projectId);
    }
}