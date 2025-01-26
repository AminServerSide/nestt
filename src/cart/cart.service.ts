import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async addToCart(addToCartDto: AddToCartDto): Promise<Cart> {
    const cartItem = this.cartRepository.create(addToCartDto);
    return await this.cartRepository.save(cartItem);
  }

  async getCartByUser(userId: number): Promise<Cart[]> {
    return await this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async updateCartItem(cartItemId: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cartItem = await this.cartRepository.findOne({ where: { id: cartItemId } });
    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${cartItemId} not found`);
    }
    this.cartRepository.merge(cartItem, updateCartDto);
    return await this.cartRepository.save(cartItem);
  }

  async removeFromCart(cartItemId: number): Promise<void> {
    const cartItem = await this.cartRepository.findOne({ where: { id: cartItemId } });
    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${cartItemId} not found`);
    }
    await this.cartRepository.remove(cartItem);
  }

  async getCartByAdmin(adminId: number): Promise<Cart[]> {
    // Assuming admin has access to all carts
    return await this.cartRepository.find({ relations: ['user', 'product'] });
  }
}