import { IsEnum } from 'class-validator';
import { PaymentMethod } from '../entities/factor.entity';

export class CheckoutFactorDto {
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
