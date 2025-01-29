import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { UserModule } from '../user/user.module'; // Import UserModule
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Product]), // Import Cart and Product entities
    UserModule, // Import UserModule to make UserRepository available
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}