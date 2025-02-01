// src/wallet/dto/create-wallet.dto.ts
export class CreateWalletDto {
    readonly userId: number; // ID of the user
    readonly balance: number; // Initial balance
  }