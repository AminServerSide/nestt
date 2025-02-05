import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  factorId: number;
}
