// src/factor/factor.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factor } from './entities/factor.entity';
import { User } from '.././user/entities/user.entity';
import { Cart } from '.././cart/entities/cart.entity';
import { CreateFactorDto } from './dto/create-factor.dto';
import { UpdateFactorDto } from './dto/update-factor.dto';
import { WalletService } from '.././wallet/wallet.service'; // Import WalletService

@Injectable()
export class FactorService {
  constructor(
    @InjectRepository(Factor)
    private readonly factorRepository: Repository<Factor>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly walletService: WalletService, // Inject WalletService
  ) {}


  // Create a new factor
  async create(userId: number, cartId: number): Promise<Factor> {
    const cart = await this.cartService.getCartById(cartId);
    const wallet = await this.walletService.findByUserId(userId);

    if (wallet.balance < cart.totalPrice) {
      throw new Error('Insufficient funds');
    }

    wallet.balance -= cart.totalPrice;
    await this.walletService.save(wallet);

    const factor = this.factorRepository.create({
      user: await this.userRepository.findOne(userId),
      cart: cart,
      // Add other necessary properties here
    });

    return this.factorRepository.save(factor);
  }



  // Find a single factor by ID
  async findOne(id: number): Promise<Factor> {
    const factor = await this.factorRepository.findOne({
      where: { id },
      relations: ['user', 'carts'], // Include user and carts details
    });
    if (!factor) {
      throw new NotFoundException(`Factor with ID ${id} not found`);
    }
    return factor;
  }

  // Find all factors
  async findAll(): Promise<Factor[]> {
    return await this.factorRepository.find({
      relations: ['user', 'carts'], // Include user and carts details
    });
  }

  // Update a factor
  async update(id: number, updateFactorDto: UpdateFactorDto): Promise<Factor> {
    const factor = await this.factorRepository.findOne({ where: { id } });
    if (!factor) {
      throw new NotFoundException(`Factor with ID ${id} not found`);
    }

    // Merge the updated data into the existing factor
    this.factorRepository.merge(factor, updateFactorDto);
    return await this.factorRepository.save(factor);
  }

  // Remove a factor
  async remove(id: number): Promise<void> {
    const factor = await this.factorRepository.findOne({ where: { id } });
    if (!factor) {
      throw new NotFoundException(`Factor with ID ${id} not found`);
    }
    await this.factorRepository.remove(factor);
  }

  // Approve a factor (check wallet balance)
  async approveFactor(factorId: number): Promise<Factor> {
    const factor = await this.factorRepository.findOne({
      where: { id: factorId },
      relations: ['user', 'carts'], // Include user and carts details
    });
    if (!factor) {
      throw new NotFoundException(`Factor with ID ${factorId} not found`);
    }

    // Check the user's wallet balance
    const wallet = await this.walletService.findByUserId(factor.user.id);
    if (wallet.balance < factor.totalPrice) {
      throw new BadRequestException('Insufficient balance in wallet');
    }

    // Update the factor status to "approved"
    factor.status = 'approved';
    return await this.factorRepository.save(factor);
  }
}