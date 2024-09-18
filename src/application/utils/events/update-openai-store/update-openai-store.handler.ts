import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UpdateOpenAIStoreEvent } from "./update-openai-store.event";
import { IProjectRepository } from "src/domain/projects/project.repository";
import { IUtilsRepository } from "src/domain/utils/utils.repository";
import { UpdateOpenAIMapper } from "./update-openai-store.mapper";
import { OpeanAIInformation } from "src/domain/utils/project-information";
import { IEvaluationRepository } from "src/domain/evaluations/evaluation.repository";

@EventsHandler(UpdateOpenAIStoreEvent)
export class UpdateOpenAIStoreHandler implements IEventHandler<UpdateOpenAIStoreEvent> {

    constructor(
        private _projectRepository: IProjectRepository,
        private _utilsRepository: IUtilsRepository,
        private _evaluationRepository: IEvaluationRepository,

    ) { }
    async handle(event: UpdateOpenAIStoreEvent) {
        let resultProjects = await this._projectRepository.GetWithRelations();
        let projects = resultProjects.map(item => UpdateOpenAIMapper.mapProjectToProjectInformation(item));
        let resultEvaluation = await this._evaluationRepository.Get();
        let evaluation = resultEvaluation.map(item => UpdateOpenAIMapper.mapEvaluationToEvaluationInformation(item));

        await this._utilsRepository.UploadJsonToOpenAI(new OpeanAIInformation(evaluation, projects));
    }
}
