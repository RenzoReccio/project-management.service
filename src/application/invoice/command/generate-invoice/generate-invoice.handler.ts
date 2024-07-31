import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { GenerateInvoiceCommand } from "./generate-invoice.command";
import { Task } from "src/domain/tasks/task";
import { TaskRepository } from "src/infrastructure/repository/task.repository";
import { ITaskRepository } from "src/domain/tasks/task.repository";
import { IInvoiceRepository } from "src/domain/invoice/invoice.repository";
import { Invoice } from "src/domain/invoice/invoice";
import { Project } from "src/domain/projects/project";
import { InvoiceDetail } from "src/domain/invoice-detail/invoice-detail";
import { IInvoiceDetailRepository } from "src/domain/invoice-detail/invoice-detail.repository";
import { GenerateInvoiceResponse } from "./generate.invoice.response";
import { IProjectRepository } from "src/domain/projects/project.repository";

@CommandHandler(GenerateInvoiceCommand)
export class GenerateInvoiceHandler implements ICommandHandler<GenerateInvoiceCommand, GenerateInvoiceResponse[]> {

    constructor(
        private _taskRepository: ITaskRepository,
        private _projectRepository: IProjectRepository,
        private _invoiceRepository: IInvoiceRepository,
        private _invoiceDetailRepository: IInvoiceDetailRepository,
    ) { }
    async execute(command: GenerateInvoiceCommand): Promise<GenerateInvoiceResponse[]> {
        let project = await this._projectRepository.GetById(command.projectId)
        let closedTasks = await this._taskRepository.GetClosedTasks(command.month, command.year);
        let invoice = new Invoice(null, { id: command.projectId } as Project, command.month, command.year,
            new Date(), command.pricePerHour, [],
        );
        invoice.id = await this._invoiceRepository.Insert(invoice);
        let detailInvoice = closedTasks.map(item => this.mapTaskToDetailInvoice(item));
        invoice.detailInvoice = await this._invoiceDetailRepository.InsertMany(invoice.id, detailInvoice);
        return invoice.detailInvoice.map(item => this.mapGenerateInvoiceResponse(project, invoice, item));
    }

    private mapTaskToDetailInvoice(task: Task) {
        return new InvoiceDetail(null, null, task.completedWork, task.externalId, task.title, task.updatedDate)
    }

    private mapGenerateInvoiceResponse(project: Project, invoice: Invoice, invoiceDetail: InvoiceDetail) {
        return new GenerateInvoiceResponse(
            project.title, invoice.month, invoice.year,
            invoiceDetail.dedicatedHours, invoice.pricePerHour,
            invoiceDetail.dedicatedHours * invoice.pricePerHour, invoiceDetail.taskDescription,
            this.formatDate(invoiceDetail.date)
        )
    }

    private formatDate(date: Date) {
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();
        return this.addZeroes(dd) + '/' + this.addZeroes(mm) + '/' + yyyy;
    }

    addZeroes(num: number) {
        if (num < 10) return '0' + num;
        return num.toString()
    }

}
