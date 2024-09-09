import { Invoice } from "src/domain/invoices/invoice";
import { InvoiceDetail } from "src/domain/invoices/invoice-detail";
import { IInvoiceRepository } from "src/domain/invoices/invoice.repository";
import { InvoiceDetailEntity } from "../entity/invoice-detail.entity";
import { InvoiceEntity } from "../entity/invoice.entity";
import { InvoiceMapper } from "./mappers/invoice.mapper";
import { InvoiceDetailMapper } from "./mappers/invoiceDetail.mapper";

export class InvoiceRepository implements IInvoiceRepository {
    async GetById(id: number): Promise<Invoice> {
        let result = await InvoiceEntity.findOne(
            {
                where: { id: id },
                relations: ["project"]
            },
        )
        return InvoiceMapper.mapInvoiceEntityToInvoice(result)
    }
    async Get(): Promise<Invoice[]> {
        let result = await InvoiceEntity.find(
            {
                relations: ["project", "detailInvoice"],
                order: { id: 'DESC' }
            },
        )
        return result.map(InvoiceMapper.mapInvoiceEntityToInvoice)
    }

    async GetDetailByInvoiceId(invoiceId: number): Promise<InvoiceDetail[]> {
        let result = await InvoiceDetailEntity.find(
            {
                where: { invoice: { id: invoiceId } },
            },
        )

        return result.map(InvoiceDetailMapper.mapInvoiceDetailEntityToInvoiceDetail);
    }

    async GetByProjectId(projectId: number): Promise<Invoice[]> {
        let result = await InvoiceEntity.find(
            {
                relations: ["project", "detailInvoice"],
                where: { project: { id: projectId } },
                order: { id: 'DESC' }
            }
        )
        return result.map(InvoiceMapper.mapInvoiceEntityToInvoice)
    }

    public async Insert(invoice: Invoice): Promise<number> {
        let invoiceInsert = await InvoiceEntity.save({
            project: { id: invoice.project.id },
            month: invoice.month,
            year: invoice.year,
            createdDate: invoice.createdDate,
            pricePerHour: invoice.pricePerHour,
        })

        return invoiceInsert.id
    }

    public async InsertDetail(invoiceId: number, invoiceDetail: InvoiceDetail[]): Promise<InvoiceDetail[]> {

        let detailInvoice = invoiceDetail.map(item => this.mapInvoiceToInvoiceEntity(invoiceId, item))
        let insertedInvoice = InvoiceDetailEntity.save(detailInvoice)

        return invoiceDetail;
    }

    private mapInvoiceToInvoiceEntity(invoiceId: number, item: InvoiceDetail): InvoiceDetailEntity {

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