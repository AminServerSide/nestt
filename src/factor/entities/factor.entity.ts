import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Cart } from '../../cart/entities/cart.entity';

export enum FactorStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
  WALLET = 'WALLET',
  CREDIT_CARD = 'CREDIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

interface FactorItem {
  productId: number;
  quantity: number;
  price: number;
  totalPrice: number;
}

@Entity('factors')
export class Factor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.factors, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Cart, (cart) => cart.factor)
  cart: Cart;

  @Column('jsonb')
  items: FactorItem[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  discountAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  finalAmount: number;

  @Column({
    type: 'enum',
    enum: FactorStatus,
    default: FactorStatus.PENDING
  })
  status: FactorStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.WALLET,
    nullable: true
  })
  paymentMethod: PaymentMethod;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}