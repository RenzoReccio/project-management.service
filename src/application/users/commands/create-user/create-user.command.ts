export class CreateUserCommand {
    personId: number;
    password: string;
    constructor(personId: number, password: string) {
        this.personId = personId
        this.password = password
    }
}