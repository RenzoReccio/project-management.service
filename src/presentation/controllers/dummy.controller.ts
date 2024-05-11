import { Controller, Get } from '@nestjs/common';

@Controller()
export class DummyController {

    constructor() { }

    @Get()
    getHello(): string {

        return "I'm not a fool";
    }
}
