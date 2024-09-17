import { Epic } from "../work-items/epics/epic";
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
    epics: Epic[];
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

    setEpics(epics: Epic[]) {
        this.epics = epics
    }
}
