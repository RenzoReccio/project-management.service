import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import { ProjectEntity } from "./project.entity";

@Entity("invoice")
export class InvoiceEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => ProjectEntity)
    project: ProjectEntity

    @Column()
    month: number;

    @Column()
    year: number;

    @Column()
    createdDate: Date;

    @Column()
    pricePerHour: number;
}