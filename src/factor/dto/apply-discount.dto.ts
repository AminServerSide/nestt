import { IsString, IsNotEmpty } from 'class-validator';

export class ApplyDiscountDto {
  @IsString()
  @IsNotEmpty()
  discountCode: string;
}
