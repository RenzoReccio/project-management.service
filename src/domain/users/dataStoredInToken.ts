
export class DataStoredInToken {
    firstName: string;
    lastName: string;
    externalId: string;
    email: string;
    constructor(
        firstName: string,
        lastName: string,
        externalId: string,
        email: string
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.externalId = externalId
        this.email = email
    }
}