import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import { EpicEntity } from "./epic.entity";

@Entity("invoice")
export class InvoiceEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => EpicEntity)
    project: EpicEntity

    @Column()
    month: number;

    @Column()
    year: number;

    @Column()
    createdDate: Date;

    @Column()
    pricePerHour: number;
}