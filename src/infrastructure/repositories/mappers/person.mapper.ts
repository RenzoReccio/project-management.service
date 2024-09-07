import { PersonEntity } from "src/infrastructure/entity/person.entity";
import { Person } from "src/domain/work-items/person";

export class PersonMapper {
    public static mapPersonEntityToPerson(personEntity: PersonEntity): Person {
        return new Person(
            {
                id: personEntity.id,
                firstName: personEntity.firstName,
                lastName: personEntity.lastName,
                externalId: personEntity.externalId,
                email: personEntity.email
            }
        );
    }
}