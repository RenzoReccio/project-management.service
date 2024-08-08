import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PersonEntity } from "./person.entity";

@Entity("evaluation")
export class EvaluationEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column()
    score: number;

    @ManyToOne(() => PersonEntity)
    person: PersonEntity;

    @Column()
    skillsToImprove: string;

    @Column()
    skillsReached: string;

    @Column()
    isClosed: boolean;

}