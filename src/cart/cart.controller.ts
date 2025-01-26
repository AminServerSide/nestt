import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @Get('user/:userId')
  getCartByUser(@Param('userId') userId: string) {
    return this.cartService.getCartByUser(+userId);
  }

  @Put('update/:cartItemId')
  updateCartItem(@Param('cartItemId') cartItemId: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCartItem(+cartItemId, updateCartDto);
  }

  @Delete('remove/:cartItemId')
  removeFromCart(@Param('cartItemId') cartItemId: string) {
    return this.cartService.removeFromCart(+cartItemId);
  }

  @Get('admin/:adminId')
  getCartByAdmin(@Param('adminId') adminId: string) {
    return this.cartService.getCartByAdmin(+adminId);
  }
}