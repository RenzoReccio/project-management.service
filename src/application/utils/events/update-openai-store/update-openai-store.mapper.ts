import { Evaluation } from "src/domain/evaluations/evaluation"
import { Invoice } from "src/domain/invoices/invoice"
import { InvoiceDetail } from "src/domain/invoices/invoice-detail"
import { Project } from "src/domain/projects/project"
import { EvaluationInformation, InvoiceDetailInformation, InvoiceInformation, ProjectInformation, WorkItems } from "src/domain/utils/project-information"
import { Epic } from "src/domain/work-items/epics/epic"
import { Feature } from "src/domain/work-items/features/feature"
import { Task } from "src/domain/work-items/tasks/task"
import { UserStory } from "src/domain/work-items/user-story/user-story"

export class UpdateOpenAIMapper {
    static mapEvaluationToEvaluationInformation(evaluation: Evaluation) {

        return new EvaluationInformation(
            evaluation.date,
            evaluation.createdDate,
            evaluation.updatedDate,
            evaluation.score,
            evaluation.person?.firstName,
            evaluation.skillsToImprove,
            evaluation.skillsReached,
            evaluation.isClosed,
            evaluation.quantityScore,
            evaluation.finalScore
        )
    }

    static mapProjectToProjectInformation(project: Project) {

        return new ProjectInformation(
            project.id,
            project.title,
            project.description,
            project.pricePerHour,
            project.createdDate,
            project.epics?.map(UpdateOpenAIMapper.mapEpicToWorkItemResponse),
            project.invoices?.map(UpdateOpenAIMapper.mapInformationToInviceInformationResponse),
        )
    }

    private static mapFeatureToWorkItemResponse(feature: Feature) {
        return new WorkItems(feature.externalId, 'Feature', feature.title,
            feature.state, feature.valueArea, feature.tags,
            feature.userStories?.map(item => UpdateOpenAIMapper.mapUserStoryToWorkItemResponse(item)), feature.pageUrl,
            null
        )
    }

    private static mapEpicToWorkItemResponse(epic: Epic) {
        return new WorkItems(epic.externalId, 'Epic', epic.title,
            epic.state, epic.valueArea, epic.tags,
            epic.features?.map(UpdateOpenAIMapper.mapFeatureToWorkItemResponse), epic.pageUrl,
            null
        )
    }

    private static mapUserStoryToWorkItemResponse(userStory: UserStory) {
        return new WorkItems(userStory.externalId, 'User Story', userStory.title,
            userStory.state, userStory.valueArea, userStory.tags,
            userStory.tasks?.map(item => UpdateOpenAIMapper.mapTaskToWorkItemResponse(item)),
            userStory.pageUrl,
            null
        )
    }
    private static mapTaskToWorkItemResponse(task: Task) {
        return new WorkItems(task.externalId, 'Task', task.title,
            task.state, "", task.tags,
            undefined, task.pageUrl, task.assignedTo?.firstName
        )
    }

    private static mapInformationToInviceInformationResponse(invoice: Invoice) {
        return new InvoiceInformation(
            invoice.id,
            invoice.month,
            invoice.year,
            invoice.createdDate,
            invoice.pricePerHour,
            invoice.detailInvoice.map(UpdateOpenAIMapper.mapInvoiceDetailToInvoiceDetailInformation)
        )
    }
    private static mapInvoiceDetailToInvoiceDetailInformation(invoiceDetail: InvoiceDetail) {
        return new InvoiceDetailInformation(
            invoiceDetail.id,
            invoiceDetail.dedicatedHours,
            invoiceDetail.externalId,
            invoiceDetail.taskDescription,
            invoiceDetail.date
        )
    }
}