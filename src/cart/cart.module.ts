import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { UserModule } from '../user/user.module';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Factor } from '../factor/entities/factor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Product, User, Factor]),
    UserModule,
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}