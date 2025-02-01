// src/wallet/entities/wallet.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from '../../user/entities/user.entity';
  
  @Entity('wallets')
  export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToOne(() => User, (user) => user.wallet) // One-to-one relationship with User
    @JoinColumn({ name: 'user_id' }) // Foreign key column in the database
    user: User;
  
    @Column({ type: 'float', default: 0 })
    balance: number; // User's wallet balance
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }