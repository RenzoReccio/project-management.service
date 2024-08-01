import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GenerateInvoiceCommand } from "src/application/invoices/commands/generate-invoice/generate-invoice.command";
import { GenerateInvoiceResponse } from "src/application/invoices/commands/generate-invoice/generate-invoice.response";
import { CustomResponse } from "../dtos/response.model";
import { GenerateInvoiceDto } from "../dtos/invoice.dto";

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
}