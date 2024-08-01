import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonEntity } from "./person.entity";
import { EpicEntity } from "./epic.entity";

@Entity("epicComment")
export class EpicCommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    date: Date;

    @ManyToOne(() => PersonEntity)
    createdBy: PersonEntity;

    @Column({ nullable: true })
    text: string;

    @ManyToOne(() => EpicEntity)
    epic: EpicEntity
}