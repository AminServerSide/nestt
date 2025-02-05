// src/wallet/dto/update-wallet.dto.ts
import { IsOptional, IsNumber, IsPositive } from 'class-validator';

export class UpdateWalletDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  balance: number;
}