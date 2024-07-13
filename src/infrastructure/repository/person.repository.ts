import { Injectable } from "@nestjs/common";
import { Person } from "src/domain/person/person";
import { IPersonRepository } from "src/domain/person/person.repository";
import { PersonEntity } from "../entity/person.entity";
import { In } from "typeorm";

@Injectable()
export class PersonRepository implements IPersonRepository {
    async InsertMany(persons: Person[]): Promise<number> {
        let personsInsert = await PersonEntity.save(persons.map(item => {
            let personEntity = new PersonEntity()
            personEntity.email = item.email;
            personEntity.firstName = item.firstName;
            personEntity.externalId = item.externalId;
            personEntity.lastName = item.lastName;
            personEntity.id = undefined;
            return personEntity
        }))
        return personsInsert.length
    }
    async GetManyByExternalId(externalId: string[]): Promise<Person[]> {
        return await PersonEntity.findBy({ externalId: In(externalId) })
    }
}