// src/wallet/entities/wallet.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity'; // Import the User entity

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn() // Auto-incrementing number
  id: number;

  @Column({ type: 'decimal', precision: 20, scale: 2, nullable: true })
  balance: number;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency: string;

  @ManyToOne(() => User, user => user.wallets)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number; // User ID as number (foreign key)

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}