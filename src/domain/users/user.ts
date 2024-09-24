import { Person } from "../work-items/person"

export class User {

    id: number
    password: string
    person: Person
    constructor(id: number, password: string, person: Person) {
        this.id = id
        this.password = password
        this.person = person
    }
}