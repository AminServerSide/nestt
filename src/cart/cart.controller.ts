// src/cart/cart.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':userId')
  async createCart(@Param('userId') userId: number): Promise<Cart> {
    return this.cartService.createCart(userId);
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
  async getCart(@Param('cartId') cartId: number): Promise<Cart> {
    return this.cartService.getCartById(cartId);
  }

  @Get('user/:userId')
  async getCartsByUser(@Param('userId') userId: number): Promise<Cart[]> {
    return this.cartService.getCartsByUser(userId);
  }

  @Delete(':cartId/remove-product/:productId')
  async removeProductFromCart(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
  ): Promise<Cart> {
    return this.cartService.removeProductFromCart(cartId, productId);
  }

  @Delete(':cartId')
  async deleteCart(@Param('cartId') cartId: number): Promise<void> {
    return this.cartService.deleteCart(cartId);
  }
}