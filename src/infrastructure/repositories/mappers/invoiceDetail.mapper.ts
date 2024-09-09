import { InvoiceDetail } from "src/domain/invoices/invoice-detail";
import { InvoiceDetailEntity } from "src/infrastructure/entity/invoice-detail.entity";

export class InvoiceDetailMapper {

    static mapInvoiceDetailEntityToInvoiceDetail(invoiceDetailEntity: InvoiceDetailEntity): InvoiceDetail {
        return new InvoiceDetail(
            invoiceDetailEntity.id,
            null,
            invoiceDetailEntity.dedicatedHours,
            invoiceDetailEntity.externalId,
            invoiceDetailEntity.taskDescription,
            invoiceDetailEntity.date
        )
    }
}