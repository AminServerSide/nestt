// src/comment/entities/comment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('comments') // Ensure the table name is correct
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.comments) // Many comments belong to one user
  @JoinColumn({ name: 'user_id' }) // Foreign key column in the database
  user: User;

  @ManyToOne(() => Product, (product) => product.comments) // Many comments belong to one product
  @JoinColumn({ name: 'product_id' }) // Foreign key column in the database
  product: Product;

  @Column({ length: 200 })
  comment: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ default: false })
  isApproved: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}