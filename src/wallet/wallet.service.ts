// src/wallet/wallet.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { User } from '.././user/entities/user.entity'; // Import the User entity

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inject User repository
  ) {}

  async createWallet(createWalletDto: CreateWalletDto): Promise<Wallet> {
    // Check if the user exists
    const user = await this.userRepository.findOne({ where: { id: createWalletDto.userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${createWalletDto.userId} not found`);
    }

    // Create the wallet with all required properties
    const wallet = this.walletRepository.create({
      balance: parseFloat(createWalletDto.balance),
      currency: createWalletDto.currency,
      user,
      userId: user.id
    });

    return this.walletRepository.save(wallet);
  }

  async getWalletById(id: number): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({ where: { id } });
    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${id} not found`);
    }
    return wallet;
  }

  async updateWallet(id: number, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    const wallet = await this.getWalletById(id);
    Object.assign(wallet, updateWalletDto);
    return this.walletRepository.save(wallet);
  }

  async deleteWallet(id: number): Promise<void> {
    const wallet = await this.getWalletById(id);
    await this.walletRepository.remove(wallet);
  }

  async addFunds(id: number, amount: string): Promise<Wallet> {
    const wallet = await this.getWalletById(id);
    const currentBalance = wallet.balance;
    const newBalance = currentBalance + parseFloat(amount);
    wallet.balance = newBalance
    return this.walletRepository.save(wallet);
  }

  async deductFunds(id: number, amount: string): Promise<Wallet> {
    const wallet = await this.getWalletById(id);
    const currentBalance = wallet.balance
    if (currentBalance < parseFloat(amount)) {
      throw new Error('Insufficient funds');
    }
    const newBalance = currentBalance - parseFloat(amount);
    wallet.balance = newBalance
    return this.walletRepository.save(wallet);
  }

  async getWalletByUserId(userId: number): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({ where: { userId } });
    if (!wallet) {
      throw new NotFoundException(`Wallet for user with ID ${userId} not found`);
    }
    return wallet;
  }

  async withdraw(userId: string, amount: string): Promise<Wallet> {
    const wallet = await this.getWalletByUserId(Number(userId));
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    const currentBalance = Number(wallet.balance);
    const withdrawAmount = Number(amount);

    if (currentBalance < withdrawAmount) {
      throw new BadRequestException('Insufficient balance');
    }

    wallet.balance = currentBalance - withdrawAmount;
    return this.walletRepository.save(wallet);
  }
}