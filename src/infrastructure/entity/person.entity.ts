import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("person")
export class PersonEntity extends BaseEntity  {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    externalId: string;

    @Column({ nullable: true })
    email: string;
}