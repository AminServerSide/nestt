// src/cart/cart.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { AdminGuard } from '../user/guards/admin.guard';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':userId')
  async createCart(
    @Param('userId') userId: number,
    @Query('factorId') factorId?: number,
  ): Promise<Cart> {
    return this.cartService.createCart(userId, factorId);
  }

  @Post(':cartId/add-product/:productId')
  async addProductToCart(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
    @Body('quantity') quantity: number,
  ): Promise<Cart> {
    return this.cartService.addProductToCart(cartId, productId, quantity);
  }

  @Get(':cartId')
  @UseGuards(AdminGuard) // Protect this route with an admin guard
  async getCart(@Param('cartId') cartId: number): Promise<Cart> {
    return this.cartService.getCartById(cartId);
  }

  @Get('user/:userId')
  @UseGuards(AdminGuard) // Protect this route with an admin guard
  async getCartsByUser(@Param('userId') userId: number): Promise<Cart[]> {
    return this.cartService.getCartsByUser(userId);
  }

  @Delete(':cartId/remove-product/:productId')
  @UseGuards(AdminGuard) // Protect this route with an admin guard
  async removeProductFromCart(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
  ): Promise<Cart> {
    return this.cartService.removeProductFromCart(cartId, productId);
  }

  @Delete(':cartId')
  @UseGuards(AdminGuard) // Protect this route with an admin guard
  async deleteCart(@Param('cartId') cartId: number): Promise<void> {
    return this.cartService.deleteCart(cartId);
  }
}