import { Invoice } from "./invoice";
import { InvoiceDetail } from "./invoice-detail";

export abstract class IInvoiceRepository {

    abstract Insert(invoice: Invoice): Promise<number>;

    abstract InsertDetail(invoiceId: number, invoiceDetail: InvoiceDetail[]): Promise<InvoiceDetail[]>;

    abstract GetById(id: number): Promise<Invoice>;

    abstract GetDetailByInvoiceId(invoiceId: number): Promise<InvoiceDetail[]>;

    abstract GetByProjectId(projectId: number): Promise<Invoice[]>;
}