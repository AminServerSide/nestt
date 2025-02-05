// filepath: /c:/Users/A.N/Desktop/New folder/e-commerce/src/user/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { Factor } from '../../factor/entities/factor.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  firstname: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastname: string;

  @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 11, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'int', nullable: true })
  gender: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'varchar', length: 255, nullable: true })
  accessToken: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Factor, (factor) => factor.user)
  factors: Factor[];

  // Define the One-to-Many relationship with Wallet
  @OneToMany(() => Wallet, wallet => wallet.user)
  wallets: Wallet[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }
}