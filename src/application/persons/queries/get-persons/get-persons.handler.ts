import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPersonsQuery } from "./get-persons.query";
import { Person } from "src/domain/work-items/person";
import { IPersonRepository } from "src/domain/work-items/person.repository";

@QueryHandler(GetPersonsQuery)
export class GetPersonsHandler implements IQueryHandler<GetPersonsQuery, Person[]> {

    constructor(
        private _personRepository: IPersonRepository,
    ) { }
    async execute(query: GetPersonsQuery): Promise<Person[]> {
        return await this._personRepository.Get();
    }
}