import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './entities/wallet.entity';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post(':userId')
  async createWallet(@Param('userId') userId: number): Promise<Wallet> {
    return this.walletService.createWallet(userId);
  }

  @Post(':walletId/add-funds')
  async addFunds(
    @Param('walletId') walletId: number,
    @Body('amount') amount: number,
  ): Promise<Wallet> {
    return this.walletService.addFunds(walletId, amount);
  }

  @Post(':walletId/deduct-funds')
  async deductFunds(
    @Param('walletId') walletId: number,
    @Body('amount') amount: number,
  ): Promise<Wallet> {
    return this.walletService.deductFunds(walletId, amount);
  }

  @Get(':walletId')
  async getWalletById(@Param('walletId') walletId: number): Promise<Wallet> {
    return this.walletService.getWalletById(walletId);
  }
}