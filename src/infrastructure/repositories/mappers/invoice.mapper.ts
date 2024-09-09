import { Invoice } from "src/domain/invoices/invoice";
import { InvoiceEntity } from "src/infrastructure/entity/invoice.entity";
import { ProjectMapper } from "./project.mapper";
import { InvoiceDetailEntity } from "src/infrastructure/entity/invoice-detail.entity";
import { InvoiceDetail } from "src/domain/invoices/invoice-detail";
import { InvoiceDetailMapper } from "./invoiceDetail.mapper";

export class InvoiceMapper {
    static mapInvoiceEntityToInvoice(invoiceEntity: InvoiceEntity): Invoice {
        return new Invoice(
            invoiceEntity.id,
            invoiceEntity.project ? ProjectMapper.mapProjectEntityToProject(invoiceEntity.project) : null,
            invoiceEntity.month,
            invoiceEntity.year,
            invoiceEntity.createdDate,
            invoiceEntity.pricePerHour,
            invoiceEntity.detailInvoice ? invoiceEntity.detailInvoice.map(InvoiceDetailMapper.mapInvoiceDetailEntityToInvoiceDetail) : []
        )
    }
}