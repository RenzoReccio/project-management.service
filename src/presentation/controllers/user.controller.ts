import { Body, Controller, Post, Response } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CustomResponse } from "../dtos/response.model";
import { LoginCommand } from "src/application/users/commands/login/login.command";
import { LoginDto } from "../dtos/login.dto";
import { CreateUserDto } from "../dtos/create-user.dto";
import { CreateUserCommand } from "src/application/users/commands/create-user/create-user.command";

@Controller('user')
export class UserController {

    constructor(
        private _queryBus: QueryBus,
        private _commandBus: CommandBus,
    ) { }

    @Post("login")
    async login(@Body() loginDto: LoginDto, @Response() res) {
        let command = new LoginCommand(
            loginDto.email, loginDto.password
        );

        const result = await this._commandBus.execute(command)
        let response = new CustomResponse<string>(
            `Inicio de sesión correcto.`,
            'Correcto',
            null
        )
        res.setHeader('Access-Control-Expose-Headers', 'authorization');

        return res.header('authorization', result).json(response);
    }

    @Post("")
    async insert(@Body() userDto: CreateUserDto) {
        let command = new CreateUserCommand(
            userDto.personId, userDto.password
        );

        const result = await this._commandBus.execute(command)
        let response = new CustomResponse<string>(
            `Usuario creado.`,
            result,
            null
        )
        return response
    }
}
