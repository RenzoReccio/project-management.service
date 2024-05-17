import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller()
export class InvoiceController {

    constructor(
        private _commandBus: CommandBus,
        private _queryBus: QueryBus
    ) { }

    @Get()
    getInvoices(): string {

        return "I'm not a fool";
    }

    @Get()
    getInvoiceById(): string {

        return "I'm not a fool";
    }

    @Post()
    generateInvoice() { }

    @Put()
    updateInvoice() { }

    @Delete()
    deleteInvoice() { }

}