import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("projectState")
export class ProjectStateEntity extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column({ nullable: true })
    name: string;
}