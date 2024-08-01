import { Invoice } from "src/domain/invoices/invoice";
import { InvoiceEntity } from "src/infrastructure/entity/invoice.entity";
import { ProjectMapper } from "./project.mapper";
import { InvoiceDetailEntity } from "src/infrastructure/entity/invoice-detail.entity";
import { InvoiceDetail } from "src/domain/invoices/invoice-detail";

export class InvoiceMapper {
    static mapInvoiceEntityToInvoice(invoiceEntity: InvoiceEntity): Invoice {
        return new Invoice(
            invoiceEntity.id,
            invoiceEntity.project ? ProjectMapper.mapProjectEntityToProject(invoiceEntity.project) : null,
            invoiceEntity.month,
            invoiceEntity.year,
            invoiceEntity.createdDate,
            invoiceEntity.pricePerHour,
            []
        )
    }

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