import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IUserRepository } from "src/domain/users/user.repository";
import { ValidationException } from "src/application/exceptions/validation.expection";
import { DataStoredInToken } from "src/domain/users/dataStoredInToken";
import { CreateUserCommand } from "./create-user.command";
import { User } from "src/domain/users/user";
import { Person } from "src/domain/work-items/person";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, number> {

    constructor(
        private _userRepository: IUserRepository,
    ) { }

    async execute(command: CreateUserCommand): Promise<number> {
        let user = new User(null, await this._userRepository.GeneratePassword(command.password), { id: command.personId } as Person);
        return await this._userRepository.Insert(user);
    }
}
