// src/wallet/wallet.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { Wallet } from './entities/wallet.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, User])], // Add Wallet and User entities
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService], // Export WalletService
})
export class WalletModule {}