import { Module } from '@nestjs/common';
import { DummyController } from './controllers/dummy.controller';

@Module({
    imports: [],
    controllers: [DummyController],
    providers: [],
})

export class PresentationModule { }
