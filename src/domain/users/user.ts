export class User {
    id: number
    displayName: string
    externalId: string
    uniqueName: string

    constructor(
        id: number,
        displayName: string,
        externalId: string,
        uniqueName: string,
    ) {
        this.id = id
        this.displayName = displayName
        this.externalId = externalId
        this.uniqueName = uniqueName
    }
}