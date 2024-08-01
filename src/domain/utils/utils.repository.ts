import { EventLog } from "./event-log";

export abstract class IUtilsRepository {

    abstract InsertLog(resourceURL: string, message: string): Promise<boolean>;

    abstract InsertErrorLog(resourceURL: string, message: string): Promise<boolean>;

    abstract GetLogs(top: number): Promise<EventLog[]>

}