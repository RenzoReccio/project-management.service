import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateInvoiceDto } from './create-invoice.dto';
import { GenerateInvoiceCommand } from 'src/application/invoice/command/generate-invoice/generate-invoice.command';
import { CustomResponse } from '../response/response.model';

@Controller('invoice')
export class InvoiceController {

    constructor(
        private _commandBus: CommandBus,
        private _queryBus: QueryBus
    ) { }

    @Post()
    async generateInvoice(@Body() invoiceDto: CreateInvoiceDto): Promise<any> {
        return new CustomResponse<any>(
            `Generated invoice for ${invoiceDto.month}-${invoiceDto.year}`,
            await this._commandBus.execute(new GenerateInvoiceCommand(invoiceDto.month, invoiceDto.year)),
            null
        )
    }

    @Get()
    getInvoiceById(): string {

        return "I'm not a fool";
    }


    @Put()
    updateInvoice() { }

    @Delete()
    deleteInvoice() { }

}