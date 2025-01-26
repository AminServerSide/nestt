import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}