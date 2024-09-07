export enum ProjectStatesEnum {
    Active = 1,
    InPause = 2,
    Completed = 3
}
export class ProjectState {

    id: number;
    name: string;
    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }

    static GetState(projectState: ProjectStatesEnum) {
        return new ProjectState(projectState.valueOf(), ProjectStatesEnum[projectState]);
    }
}
