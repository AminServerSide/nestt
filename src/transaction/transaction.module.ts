import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { WalletModule } from '../wallet/wallet.module';
import { FactorModule } from '../factor/factor.module';
import { AuthModule } from '../user/guards/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    WalletModule,
    FactorModule,
    AuthModule,  // Added AuthModule to provide JwtService
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
