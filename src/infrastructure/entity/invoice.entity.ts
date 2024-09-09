import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, Entity, OneToMany } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { InvoiceDetailEntity } from "./invoice-detail.entity";

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

    @Column('decimal', { default: 1 })
    pricePerHour: number;

    @OneToMany(() => InvoiceDetailEntity, (invoiceDetailEntity) => invoiceDetailEntity.invoice)
    detailInvoice: InvoiceDetailEntity[]
}