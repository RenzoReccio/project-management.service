import { DataStoredInToken } from "./dataStoredInToken";
import { User } from "./user";

export abstract class IUserRepository {
    abstract CreateToken(dataStoredInToken: DataStoredInToken): string;
    abstract ValidatePassword(password: string, passwordDB: string): Promise<boolean>;
    abstract GetByPersonEmail(email: string): Promise<User>;
    abstract GeneratePassword(password: string): Promise<string>;
    abstract Insert(user: User): Promise<number>;
}