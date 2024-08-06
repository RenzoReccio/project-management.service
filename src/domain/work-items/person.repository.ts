import { Person } from "./person";

export abstract class IPersonRepository {

    abstract InsertMany(persons: Person[]): Promise<number>;

    abstract GetManyByExternalId(externalId: string[]): Promise<Person[]>;

    abstract Get(): Promise<Person[]>;
}