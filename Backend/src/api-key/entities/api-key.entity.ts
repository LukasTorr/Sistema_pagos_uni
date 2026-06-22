import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ApiKey {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    service: string;

    @Column()
    privateKeyHash: string;

    @CreateDateColumn()
    createdAt: Date;
}