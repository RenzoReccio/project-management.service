import { InvoiceDetail } from "src/domain/invoice-detail/invoice-detail";
import { IInvoiceDetailRepository } from "src/domain/invoice-detail/invoice-detail.repository";
import { InvoiceDetailEntity } from "../entity/invoice-detail.entity";
import { InvoiceEntity } from "../entity/invoice.entity";

export class InvoiceDetailRepository implements IInvoiceDetailRepository {
    InsertMany(invoiceId: number, invoiceDetail: InvoiceDetail[]): Promise<InvoiceDetail[]> {
        let detailInvoice = invoiceDetail.map(item => this.mapInvoiceToInvoiceEntity(invoiceId, item))
        let insertedInvoice = InvoiceDetailEntity.save(detailInvoice)

        return insertedInvoice;
    }

    mapInvoiceToInvoiceEntity(invoiceId: number, item: InvoiceDetail): InvoiceDetailEntity {
        let invoice = new InvoiceDetailEntity()
        invoice.invoice = { id: invoiceId } as InvoiceEntity;
        invoice.dedicatedHours = item.dedicatedHours
        invoice.externalId = item.externalId
        invoice.taskDescription = item.taskDescription
        invoice.date = item.date
        invoice.id = undefined
        return invoice;
    }
}

