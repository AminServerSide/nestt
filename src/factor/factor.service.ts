import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factor, FactorStatus, PaymentMethod } from './entities/factor.entity';
import { CreateFactorDto } from './dto/create-factor.dto';
import { WalletService } from '../wallet/wallet.service';
import { CartService } from '../cart/cart.service';

@Injectable()
export class FactorService {
  constructor(
    @InjectRepository(Factor)
    private readonly factorRepository: Repository<Factor>,
    private readonly walletService: WalletService,
    private readonly cartService: CartService,
  ) {}

  async createFactor(createFactorDto: CreateFactorDto): Promise<Factor> {
    const { userId, cartId } = createFactorDto;
    
    // Get cart and validate
    const cart = await this.cartService.getCartById(cartId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Validate cart belongs to user
    if (cart.user.id !== userId) {
      cart.user.id === userId
      // throw new BadRequestException('Cart does not belong to user');
    }

    // Validate cart has products
    if (!cart.products || cart.products.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Calculate total amount from cart products with detailed information
    const cartItems = cart.products.map(product => ({
      productId: product.id,
      productName: product.name,
      quantity: 1,
      price: product.price,
      totalPrice: product.price,
      category: product.category,
      description: product.description
    }));

    const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    // Create factor entity
    const factor = this.factorRepository.create({
      user: { id: userId },
      cart: { id: cartId },
      items: cartItems,
      totalAmount: totalAmount,
      finalAmount: totalAmount,
      status: FactorStatus.PENDING,
    });

    // Save factor with relations
    const savedFactor = await this.factorRepository.save(factor);

    // Return factor with full relations
    return this.factorRepository.findOne({
      where: { id: savedFactor.id },
      relations: ['user']
    });
  }

  async getUserFactors(userId: string): Promise<Factor[]> {
    // Get all factors for user with relations
    const factors = await this.factorRepository.find({
      where: { user: { id: parseInt(userId) } },
      relations: ['user'],
      order: { createdAt: 'DESC' }
    });

    if (!factors.length) {
      throw new NotFoundException('No factors found for this user');
    }

    return factors;
  }

  async getFactorById(factorId: string): Promise<Factor> {
    const factor = await this.factorRepository.findOne({
      where: { id: parseInt(factorId) },
      relations: ['user']
    });

    if (!factor) {
      throw new NotFoundException('Factor not found');
    }

    return factor;
  }

  async updateFactorStatus(factorId: string, status: FactorStatus): Promise<Factor> {
    const factor = await this.getFactorById(factorId);
    
    if (factor.status === FactorStatus.PAID) {
      throw new BadRequestException('Cannot update a paid factor');
    }

    factor.status = status;
    return this.factorRepository.save(factor);
  }

  async checkoutFactor(factorId: string, paymentMethod: PaymentMethod): Promise<Factor> {
    const factor = await this.getFactorById(factorId);
    
    if (factor.status !== FactorStatus.PENDING) {
       factor.status = FactorStatus.PENDING
      // throw new BadRequestException('Can only checkout pending factors');
    }

    if (paymentMethod === PaymentMethod.WALLET) {
      // Get user's wallet
      const wallet = await this.walletService.getWalletByUserId(factor.user.id);
      if (!wallet) {
        throw new BadRequestException('User does not have a wallet');
      }

      // Check if user has enough funds
      if (wallet.balance < factor.finalAmount) {
        throw new BadRequestException('Insufficient funds in wallet');
      }

      // Deduct from wallet
      await this.walletService.deductFunds(factor.user.id, factor.finalAmount.toString());
    }

    factor.paymentMethod = paymentMethod;
    factor.status = FactorStatus.PAID;
    
    return this.factorRepository.save(factor);
  }

  async applyDiscount(factorId: string, discountCode: string): Promise<Factor> {
    const factor = await this.getFactorById(factorId);
    
    if (factor.status !== FactorStatus.PENDING) {
      throw new BadRequestException('Can only apply discount to pending factors');
    }

    // TODO: Implement proper discount validation logic
    const discountAmount = 10; // Example: 10% discount
    factor.discountAmount = (factor.totalAmount * discountAmount) / 100;
    factor.finalAmount = factor.totalAmount - factor.discountAmount;

    return this.factorRepository.save(factor);
  }

  async deleteFactor(factorId: string): Promise<void> {
    const factor = await this.getFactorById(factorId);
    
    if (factor.status !== FactorStatus.PENDING) {
      throw new BadRequestException('Can only delete pending factors');
    }

    await this.factorRepository.remove(factor);
  }
}