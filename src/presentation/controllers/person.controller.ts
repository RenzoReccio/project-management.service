import { Controller, Get } from "@nestjs/common";
import { QueryBus, CommandBus } from "@nestjs/cqrs";
import { CustomResponse } from "../dtos/response.model";
import { GetPersonsQuery } from "src/application/persons/queries/get-persons/get-persons.query";
import { Person } from "src/domain/work-items/person";

@Controller('person')
export class PersonController {

    constructor(
        private _queryBus: QueryBus,
        private _commandBus: CommandBus,
    ) { }

    
    @Get()
    async get() {
        const result = await this._queryBus.execute<GetPersonsQuery, Person[]>(new GetPersonsQuery())

        const response = new CustomResponse<Person[]>(
            `Persons found ${result.length}`,
            result,
            null
        )

        return response
    }
}