import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/products.module';
import { CommentModule } from './comment/comment.module';
import { CartModule } from './cart/cart.module';
import { WalletModule } from './wallet/wallet.module';
import { FactorModule } from './factor/factor.module';
import {TransactionModule} from './transaction/transaction.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Replace with your PostgreSQL username
      password: 'amin2004', // Replace with your PostgreSQL password
      database: 'e-commerce', // Replace with your database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ensure this path is correct
      synchronize: true, // Automatically creates database tables (for development only)
    }),
    UserModule,
    ProductModule,
    CommentModule,
    CartModule,
    WalletModule,
    FactorModule,
    TransactionModule,
  ],
})
export class AppModule {}