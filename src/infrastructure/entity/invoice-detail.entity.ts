import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { InvoiceEntity } from "./invoice.entity";

@Entity()
export class InvoiceDetailEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => InvoiceEntity)
    invoice: InvoiceEntity;

    @Column()
    dedicatedHours: number;

    @Column()
    externalId: number;

    @Column()
    taskDescription: string;

    @Column({ nullable: true })
    date: Date;
}