import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Invoice } from "src/domain/invoices/invoice";
import { InvoiceDetail } from "src/domain/invoices/invoice-detail";
import { IInvoiceRepository } from "src/domain/invoices/invoice.repository";
import { Project } from "src/domain/projects/project";
import { Task } from "src/domain/work-items/tasks/task";
import { ITaskRepository } from "src/domain/work-items/tasks/task.repository";
import { GenerateInvoiceCommand } from "./generate-invoice.command";
import { GenerateInvoiceResponse } from "./generate-invoice.response";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { ValidationException } from "src/application/exceptions/validation.expection";
import { ProjectStatesEnum } from "src/domain/projects/project-state";

@CommandHandler(GenerateInvoiceCommand)
export class GenerateInvoiceHandler implements ICommandHandler<GenerateInvoiceCommand, GenerateInvoiceResponse> {

    constructor(
        private _taskRepository: ITaskRepository,
        private _invoiceRepository: IInvoiceRepository,
        private _projectRepository: IProjectRepository
    ) { }

    async execute(command: GenerateInvoiceCommand): Promise<GenerateInvoiceResponse> {

        let project = await this._projectRepository.GetById(command.projectId);
        if (project.state.id === ProjectStatesEnum.Completed) throw new ValidationException("El proyecto seleccionado se encuentra completado.")

        let closedTasks = await this._taskRepository.GetClosedTasks(command.month, command.year, command.projectId);
        if (closedTasks.length == 0) throw new ValidationException("No hay tareas cerradas en el periodo seleccionado.")
        let invoice = new Invoice(
            null,
            { id: command.projectId } as Project,
            command.month,
            command.year,
            new Date(),
            command.pricePerHour,
            [],
        );

        invoice.id = await this._invoiceRepository.Insert(invoice);
        let detailInvoice = closedTasks.map((item) => this.mapTaskToDetailInvoice(item));

        invoice.detailInvoice = await this._invoiceRepository.InsertDetail(
            invoice.id,
            detailInvoice,
        );

        return new GenerateInvoiceResponse(invoice.id)
    }

    private mapTaskToDetailInvoice(task: Task) {

        const invoiceDetail = new InvoiceDetail(
            null,
            null,
            task.completedWork,
            task.externalId,
            task.title,
            task.updatedDate,
        )

        return invoiceDetail
    }
}
