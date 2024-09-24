import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IInvoiceRepository } from "src/domain/invoices/invoice.repository";
import { ITaskRepository } from "src/domain/work-items/tasks/task.repository";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { LoginCommand } from "./login.command";
import { IUserRepository } from "src/domain/users/user.repository";
import { ValidationException } from "src/application/exceptions/validation.expection";
import { DataStoredInToken } from "src/domain/users/dataStoredInToken";

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, string> {

    constructor(
        private _userRepository: IUserRepository,
    ) { }

    async execute(command: LoginCommand): Promise<string> {
        let user = await this._userRepository.GetByPersonEmail(command.email.trim());
        if (!user) throw new ValidationException("El usuario indicado no existe");
        
        if (!(await this._userRepository.ValidatePassword(command.password, user.password))) throw new ValidationException("Contraseña incorrecta.")

        let token = new DataStoredInToken(
            user.person.firstName, 
            user.person.lastName, 
            user.person.externalId, 
            user.person.email
        );
        return this._userRepository.CreateToken(token);
    }
}
