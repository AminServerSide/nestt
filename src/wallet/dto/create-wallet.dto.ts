// src/wallet/dto/create-wallet.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number; // User ID as number

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  balance: string; // Balance as string
}