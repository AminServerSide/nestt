// src/wallet/wallet.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(createWalletDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.walletService.getWalletById(id);
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.updateWallet(id, updateWalletDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.walletService.deleteWallet(id);
  }

  @Post(':id/add-funds')
  async addFunds(@Param('id') id: number, @Body('amount') amount: string) {
    return this.walletService.addFunds(id, amount);
  }

  @Post(':id/deduct-funds')
  async deductFunds(@Param('id') id: number, @Body('amount') amount: string) {
    return this.walletService.deductFunds(id, amount);
  }

  @Get('user/:userId')
  async getWalletByUserId(@Param('userId') userId: number) {
    return this.walletService.getWalletByUserId(userId);
  }
}