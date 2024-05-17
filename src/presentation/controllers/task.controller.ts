import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller()
export class TaskController {

    constructor() { }

    @Get()
    getTasks(): string {

        return "I'm not a fool";
    }

    @Get()
    getTaskById(): string {

        return "I'm not a fool";
    }

    @Post()
    createTask() { }

    @Put()
    updateTask() { }

    @Delete()
    removeTask() { }
}