import { Invoice } from "./invoice";

export abstract class IInvoiceRepository {
    abstract Insert(invoice: Invoice): Promise<number>;
}