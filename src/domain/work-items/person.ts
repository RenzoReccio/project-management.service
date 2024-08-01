export class Person {

    id: number;
    firstName: string;
    lastName: string;
    externalId: string;
    email: string;

    constructor({
        id,
        firstName,
        lastName,
        externalId,
        email,
    }: {
        id: number;
        firstName: string;
        lastName: string;
        externalId: string;
        email: string;
    }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.externalId = externalId;
        this.email = email;
    }
}
