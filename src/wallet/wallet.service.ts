import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createWallet(userId: number): Promise<Wallet> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const wallet = this.walletRepository.create({ user });
    return this.walletRepository.save(wallet);
  }

  async addFunds(walletId: number, amount: number): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({ where: { id: walletId } });
    wallet.balance += amount;
    return this.walletRepository.save(wallet);
  }

  async deductFunds(walletId: number, amount: number): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({ where: { id: walletId } });
    if (wallet.balance < amount) {
      throw new Error('Insufficient funds');
    }
    wallet.balance -= amount;
    return this.walletRepository.save(wallet);
  }

  async getWalletById(walletId: number): Promise<Wallet> {
    return this.walletRepository.findOne({ where: { id: walletId } });
  }

  async findByUserId(userId: number): Promise<Wallet> {
    return this.walletRepository.findOne({ where: { user: { id: userId } } });
  }
}