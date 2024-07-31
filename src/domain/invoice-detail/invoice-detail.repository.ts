import { InvoiceDetail } from "./invoice-detail";

export abstract class IInvoiceDetailRepository {
    abstract InsertMany(invoiceId: number, invoiceDetail: InvoiceDetail[]): Promise<InvoiceDetail[]>;
}