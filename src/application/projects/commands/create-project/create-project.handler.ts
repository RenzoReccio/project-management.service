import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateProjectCommand } from "./create-project.command";

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler implements ICommandHandler<CreateProjectCommand> {

    constructor() { }

    async execute(command: CreateProjectCommand): Promise<any> {

        return 'Create Project Use Case'
    }

}