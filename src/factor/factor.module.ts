// src/factor/factor.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactorService } from './factor.service';
import { FactorController } from './factor.controller';
import { Factor } from './entities/factor.entity';
import { User } from '../user/entities/user.entity';
import { Cart } from '../cart/entities/cart.entity';
import { WalletModule } from '../wallet/wallet.module'; // Import WalletModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Factor, User, Cart]), // Add Factor, User, and Cart entities
    WalletModule, // Import WalletModule to use WalletService
  ],
  controllers: [FactorController],
  providers: [FactorService],
})
export class FactorModule {}