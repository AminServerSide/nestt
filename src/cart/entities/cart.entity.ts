// src/cart/entities/cart.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { Factor } from '../../factor/entities/factor.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts) // Many carts belong to one user
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Product, (product) => product.carts) // Many products can be in one cart
  @JoinTable({
    name: 'cart_products', // Join table for many-to-many relationship
    joinColumn: { name: 'cart_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[];

  @Column({ type: 'float', default: 0 })
  totalPrice: number; // Total price of all products in the cart

  @Column({ type: 'int', default: 0 })
  quantity: number; // Total quantity of products in the cart

  @ManyToOne(() => Factor, (factor) => factor.carts) // Many carts belong to one factor
  @JoinColumn({ name: 'factor_id' }) // Foreign key column in the database
  factor: Factor;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}