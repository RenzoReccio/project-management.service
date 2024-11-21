export class OpeanAIInformation {
    evaluations: EvaluationInformation[];
    projects: ProjectInformation[];
    constructor(evaluations: EvaluationInformation[], projects: ProjectInformation[]) {
        this.evaluations = evaluations
        this.projects = projects
    }
}

export class EvaluationInformation {
    date: string;
    createdDate: Date;
    updatedDate: Date;
    score: number;
    developer: string;
    skillsToImprove: string;
    skillsReached: string;
    isClosed: boolean;
    quantityScore: number;
    finalScore: number;
    constructor(
        date: Date,
        createdDate: Date,
        updatedDate: Date,
        score: number,
        developer: string,
        skillsToImprove: string,
        skillsReached: string,
        isClosed: boolean,
        quantityScore: number,
        finalScore: number
    ) {
        this.date = `${date.getMonth() + 1}/${date.getFullYear()}`
        this.createdDate = createdDate
        this.updatedDate = updatedDate
        this.score = score
        this.developer = developer
        this.skillsToImprove = skillsToImprove
        this.skillsReached = skillsReached
        this.isClosed = isClosed
        this.quantityScore = quantityScore
        this.finalScore = finalScore
    }
}
export class ProjectInformation {
    id: number;
    title: string;
    description: string;
    pricePerHour: number;
    createdDate: Date;
    workItems: WorkItems[]
    invoices: InvoiceInformation[]
    constructor(
        id: number,
        title: string,
        description: string,
        pricePerHour: number,
        createdDate: Date,
        workItems: WorkItems[],
        invoices: InvoiceInformation[]
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.pricePerHour = pricePerHour
        this.createdDate = createdDate
        this.workItems = workItems
        this.invoices = invoices
    }
}
export class WorkItems {
    externalId: number;
    workItemType: string;
    title: string;
    state: string;
    valueArea: string;
    tags: string;
    items: WorkItems[];
    pageUrl: string;
    assignedTo: string;
    constructor(
        externalId: number,
        workItemType: string,
        title: string,
        state: string,
        valueArea: string,
        tags: string,
        items: WorkItems[],
        pageUrl: string,
        assignedTo: string
    ) {
        this.externalId = externalId
        this.workItemType = workItemType
        this.title = title
        this.state = state
        this.valueArea = valueArea
        this.tags = tags
        this.items = items
        this.pageUrl = pageUrl
        this.assignedTo = assignedTo
    }
}

export class InvoiceInformation {
    id: number;
    month: number;
    year: number;
    createdDate: Date;
    pricePerHour: number;
    detailInvoice: InvoiceDetailInformation[];

    constructor(
        id: number,
        month: number,
        year: number,
        createdDate: Date,
        pricePerHour: number,
        detailInvoice: InvoiceDetailInformation[]
    ) {
        this.id = id
        this.month = month
        this.year = year
        this.createdDate = createdDate
        this.pricePerHour = pricePerHour
        this.detailInvoice = detailInvoice
    }
}


export class InvoiceDetailInformation {

    id: number;
    dedicatedHours: number;
    externalId: number;
    taskDescription: string;
    date: Date;

    constructor(
        id: number,
        dedicatedHours: number,
        externalId: number,
        taskDescription: string,
        date: Date
    ) {
        this.id = id
        this.dedicatedHours = dedicatedHours
        this.externalId = externalId
        this.taskDescription = taskDescription
        this.date = date
    }
}