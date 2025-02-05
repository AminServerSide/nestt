// src/cart/cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { Factor } from '../factor/entities/factor.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Factor)
    private readonly factorRepository: Repository<Factor>,
  ) {}


  // Create a new cart for a user with optional factorId
  async createCart(userId: number, factorId: number): Promise<Cart> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let factor = await this.factorRepository.findOne({ where: { id: factorId } });
    if (factorId) {
      factor = await this.factorRepository.findOne({ where: { id: factorId } });
      if (!factor) {
        throw new NotFoundException('Factor not found');
      }
      // Verify the factor belongs to the user
      if (factor.user.id !== userId) {
        throw new NotFoundException('Factor does not belong to this user');
      }
    }

    const cart = this.cartRepository.create({ 
      user, 
      totalPrice: 0, 
      quantity: 0,
      factorId: factorId || null 
    });
    
    return this.cartRepository.save(cart);
  }

  // Add a product to a cart
  async addProductToCart(cartId: number, productId: number, quantity: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['products'],
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Add product to cart
    cart.products.push(product);
    cart.quantity += quantity;
    cart.totalPrice += product.price * quantity;

    return this.cartRepository.save(cart);
  }

  // Get a cart by ID
  async getCartById(cartId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['products', 'user'],
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  // Get all carts for a user
  async getCartsByUser(userId: number): Promise<Cart[]> {
    return this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['products'],
    });
  }

  // Remove a product from a cart
  async removeProductFromCart(cartId: number, productId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['products'],
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Remove product from cart
    cart.products = cart.products.filter((product) => product.id !== productId);
    cart.quantity -= 1; // Adjust quantity and total price as needed
    cart.totalPrice -= cart.products.find((product) => product.id === productId)?.price || 0;

    return this.cartRepository.save(cart);
  }

  // Delete a cart
  async deleteCart(cartId: number): Promise<void> {
    const cart = await this.cartRepository.findOne({ where: { id: cartId } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    await this.cartRepository.remove(cart);
  }
}