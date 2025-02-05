import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factor } from './entities/factor.entity';
import { FactorService } from './factor.service';
import { FactorController } from './factor.controller';
import { WalletModule } from '../wallet/wallet.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Factor]),
    WalletModule,
    CartModule,
  ],
  controllers: [FactorController],
  providers: [FactorService],
  exports: [FactorService],
})
export class FactorModule {}