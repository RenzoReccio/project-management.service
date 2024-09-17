import { EventLog } from "./event-log";
import { ProjectInformation } from "./project-information";

export abstract class IUtilsRepository {

    abstract InsertLog(resourceURL: string, message: string): Promise<boolean>;

    abstract InsertErrorLog(resourceURL: string, message: string): Promise<boolean>;

    abstract GetLogs(top: number): Promise<EventLog[]>

    abstract UploadJsonToOpenAI(project: ProjectInformation[]): Promise<boolean>;
}