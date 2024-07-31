import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GenerateInvoiceCommand } from "src/application/invoices/commands/generate-invoice/generate-invoice.command";
import { CustomResponse } from "./refactor/response/response.model";

@Controller('invoice')
export class InvoiceController {

    constructor(
        private _commandBus: CommandBus,
        private _queryBus: QueryBus
    ) { }

    @Post()
    async generateInvoice(@Body() command: GenerateInvoiceCommand): Promise<any> {

        const result = await this._commandBus.execute(command)

        const response = new CustomResponse<any>(
            `Generated invoice for ${command.month}-${command.year}`,
            result,
            null
        )

        return response
    }

}