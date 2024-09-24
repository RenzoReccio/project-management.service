import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "./person.entity";

@Entity("user")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    password: string;

    @ManyToOne(() => PersonEntity, { nullable: true })
    person: PersonEntity;
}