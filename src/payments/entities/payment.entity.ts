import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  idAlumno!: string;

  @Column()
  servicio!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  monto!: number;

  @Column({ default: 'PENDIENTE' })
  estado!: string;

  @Column({ unique: true })
  transactionKey!: string;

  @CreateDateColumn()
  fechaCreacion!: Date;
}