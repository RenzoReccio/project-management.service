export abstract class IEventLogRepository {
    abstract InsertLog(resourceURL: string, message: string): Promise<boolean>;
    abstract InsertErrorLog(resourceURL: string, message: string): Promise<boolean>;
}