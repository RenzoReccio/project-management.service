import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller()
export class UserController {

    constructor() { }

    @Get()
    getUsers(): string {

        return "I'm not a fool";
    }

    @Get()
    getUserById(): string {

        return "I'm not a fool";
    }

    @Post()
    createUser() { }

    @Put()
    updateUser() { }

    @Delete()
    removeUser() { }
}