import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Factor } from '../../factor/entities/factor.entity';

export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

export enum TransactionType {
  PAYMENT = 'PAYMENT',
  REFUND = 'REFUND'
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Factor)
  @JoinColumn({ name: 'factor_id' })
  factor: Factor;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.FAILED
  })
  status: TransactionStatus;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.PAYMENT
  })
  type: TransactionType;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
