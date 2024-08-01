import { Controller } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

@Controller('project')
export class ProjectController {

    constructor(
        private _queryBus: QueryBus,
        private _commandBus: CommandBus,
    ) { }

}
