import { Invoice } from "src/domain/invoice/invoice";
import { IInvoiceRepository } from "src/domain/invoice/invoice.repository";
import { InvoiceEntity } from "../entity/invoice.entity";

export class InvoiceRepository implements IInvoiceRepository {
    async Insert(invoice: Invoice): Promise<number> {
        let invoiceInsert = await InvoiceEntity.save({
            project: { id: invoice.project.id },
            month: invoice.month,
            year: invoice.year,
            createdDate: invoice.createdDate,
            pricePerHour: invoice.pricePerHour,
        })
        return invoiceInsert.id
    }

}