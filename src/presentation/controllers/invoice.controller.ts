import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GenerateInvoiceCommand } from "src/application/invoices/commands/generate-invoice/generate-invoice.command";
import { GenerateInvoiceResponse } from "src/application/invoices/commands/generate-invoice/generate-invoice.response";
import { CustomResponse } from "../dtos/response.model";
import { GenerateInvoiceDto } from "../dtos/invoice.dto";
import { GetInvoiceByProjectIdQuery } from "src/application/invoices/queries/get-invoices-by-project-id/get-invoices-by-project-id.query";
import { Invoice } from "src/domain/invoices/invoice";
import { GetInvoiceByIdResponse } from "src/application/invoices/queries/get-invoice-by-id/get-invoice-by-id.response";
import { GetInvoiceByIdQuery } from "src/application/invoices/queries/get-invoice-by-id/get-invoice-by-id.query";

@Controller('invoice')
export class InvoiceController {

    constructor(
        private _commandBus: CommandBus,
        private _queryBus: QueryBus
    ) { }

    @Post()
    async generateInvoice(@Body() invoiceDto: GenerateInvoiceDto): Promise<CustomResponse<GenerateInvoiceResponse[]>> {
        const command = new GenerateInvoiceCommand(
            invoiceDto.month,
            invoiceDto.year,
            invoiceDto.projectId,
            invoiceDto.pricePerHour,
        )
        const result: GenerateInvoiceResponse[] = await this._commandBus.execute(command)

        const response = new CustomResponse<GenerateInvoiceResponse[]>(
            `Generated invoice for ${command.month}-${command.year}`,
            result,
            null
        )

        return response
    }

    @Get("project/:id")
    async getByProjectId(@Param('id') id: string): Promise<CustomResponse<Invoice[]>> {
        const query = new GetInvoiceByProjectIdQuery(Number(id))
        const result: Invoice[] = await this._queryBus.execute(query)

        const response = new CustomResponse<Invoice[]>(
            `Invoices found ${result.length}`,
            result,
            null
        )

        return response
    }

    @Get(":id")
    async getById(@Param('id') id: string): Promise<CustomResponse<GetInvoiceByIdResponse[]>> {
        const query = new GetInvoiceByIdQuery(Number(id))
        const result: GetInvoiceByIdResponse[] = await this._queryBus.execute(query)

        const response = new CustomResponse<GetInvoiceByIdResponse[]>(
            `Invoices detail found ${result.length}`,
            result,
            null
        )

        return response
    }
}