// src/product/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';
import { Cart } from '../../cart/entities/cart.entity'; // Import Cart entity

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 220, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 550, nullable: true })
  description: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  image: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  comment: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  category: string;

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];

  @ManyToMany(() => Cart, (cart) => cart.products) // Many products can be in many carts
  carts: Cart[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}