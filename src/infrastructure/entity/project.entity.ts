import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectStateEntity } from "./project-state.entity";
import { PersonEntity } from "./person.entity";
import { EpicEntity } from "./epic.entity";
import { EvaluationEntity } from "./evaluation.entity";
import { InvoiceEntity } from "./invoice.entity";

@Entity("project")
export class ProjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column('decimal', { nullable: false, default: 1 })
    pricePerHour: number;

    @CreateDateColumn()
    createdDate: Date;

    @ManyToOne(() => ProjectStateEntity, { nullable: true })
    state: ProjectStateEntity;

    @ManyToOne(() => PersonEntity, { nullable: true })
    assigned: PersonEntity;

    @OneToMany(() => EpicEntity, (epic) => epic.project)
    epics: EpicEntity[]

    @OneToMany(() => InvoiceEntity, (invoice) => invoice.project)
    invoices: InvoiceEntity[];
}