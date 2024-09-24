import { Injectable } from "@nestjs/common";
import { sign, verify } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { SECRET_KEY_JWT } from "src/config";
import { IUserRepository } from "src/domain/users/user.repository";
import { DataStoredInToken } from "src/domain/users/dataStoredInToken";
import { User } from "src/domain/users/user";
import { UserEntity } from "../entity/user.entity";
import { PersonEntity } from "../entity/person.entity";

@Injectable()
export class UserRepository implements IUserRepository {
    async Insert(user: User): Promise<number> {
        let save = await UserEntity.save({
            person: { id: user.person.id } as PersonEntity,
            password: user.password
        })
        return save.id
    }
    async GeneratePassword(password: string): Promise<string> {
        return await hash(password, 10);
    }
    async GetByPersonEmail(email: string): Promise<User> {
        return await UserEntity.findOne({
            relations: ["person"],
            where: { person: { email: email } }
        })
    }
    CreateToken(dataStoredInToken: DataStoredInToken): string {
        const secretKey: string = SECRET_KEY_JWT();
        const expiresIn: number = 60 * 60;
        return sign({ data: dataStoredInToken }, secretKey, { expiresIn });
    }

    async ValidatePassword(password: string, passwordDB: string): Promise<boolean> {
        return await compare(password, passwordDB);
    }
}