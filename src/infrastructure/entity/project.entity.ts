import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("project")
export class ProjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;
}