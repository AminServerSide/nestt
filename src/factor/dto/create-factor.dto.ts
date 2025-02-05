import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFactorDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  cartId: number;
}