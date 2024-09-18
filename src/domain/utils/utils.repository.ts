import { EventLog } from "./event-log";
import { OpeanAIInformation } from "./project-information";

export abstract class IUtilsRepository {

    abstract InsertLog(resourceURL: string, message: string): Promise<boolean>;

    abstract InsertErrorLog(resourceURL: string, message: string): Promise<boolean>;

    abstract GetLogs(top: number): Promise<EventLog[]>

    abstract UploadJsonToOpenAI(information: OpeanAIInformation): Promise<boolean>;
}