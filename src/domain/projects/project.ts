import { Person } from "../work-items/person";
import { ProjectState } from "./project-state";

export class Project {

    id: number;
    title: string;
    description: string;
    pricePerHour: number;
    createdDate: Date;
    state: ProjectState;
    assigned: Person;
    constructor(
        id: number,
        title: string,
        description: string,
        pricePerHour: number,
        createdDate: Date,
        state: ProjectState,
        assigned: Person
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.pricePerHour = pricePerHour
        this.createdDate = createdDate
        this.state = state
        this.assigned = assigned
    }
}
