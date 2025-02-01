// src/factor/entities/factor.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from '../../user/entities/user.entity';
  import { Cart } from '../../cart/entities/cart.entity';
  
  @Entity('factors')
  export class Factor {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.factors) // Many factors belong to one user
    @JoinColumn({ name: 'user_id' }) // Foreign key column in the database
    user: User;
  
    @OneToMany(() => Cart, (cart) => cart.factor) // One factor can have many carts
    carts: Cart[];
  
    @Column({ type: 'float' })
    totalPrice: number; // Total price of the factor
  
    @Column({ type: 'varchar', length: 50, default: 'pending' })
    status: string; // Status of the factor (e.g., "pending", "approved")
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }