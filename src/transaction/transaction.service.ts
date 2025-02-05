import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Transaction, TransactionStatus, TransactionType } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { WalletService } from '../wallet/wallet.service';
import { FactorService } from '../factor/factor.service';
import { Factor, FactorStatus } from '../factor/entities/factor.entity';

@Injectable()
export class TransactionService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    private readonly walletService: WalletService,
    private readonly factorService: FactorService,
  ) {}

  async processPayment(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const { userId, factorId } = createTransactionDto;

    // Start a database transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Get factor and check if it exists
      const factor = await this.factorService.getFactorById(factorId.toString());
      if (!factor) {
        throw new NotFoundException('Factor not found');
      }

      // Check if factor belongs to user
      if (factor.user.id !== userId) {
        throw new BadRequestException('Factor does not belong to user');
      }

      // Check if factor is already paid
      if (factor.status === FactorStatus.PAID) {
        throw new BadRequestException('Factor is already paid');
      }

      // Get user's wallet
      const wallet = await this.walletService.getWalletById(userId);
      if (wallet.balance < factor.finalAmount) {
        throw new BadRequestException('Insufficient wallet balance');
      }

      // Create transaction record
      const transaction = this.transactionRepository.create({
        user: { id: userId },
        factor: { id: factorId },
        amount: factor.finalAmount,
        type: TransactionType.PAYMENT,
        description: `Payment for factor #${factorId}`,
      });

      // Deduct amount from wallet
      await this.walletService.deductFunds(userId, factor.finalAmount.toString());

      // Update factor status
      await this.factorService.updateFactorStatus(factorId.toString(), FactorStatus.PAID);

      // Save transaction
      transaction.status = TransactionStatus.SUCCESS;
      await queryRunner.manager.save(transaction);

      // Commit transaction
      await queryRunner.commitTransaction();

      return transaction;
    } catch (error) {
      // Rollback transaction in case of error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release query runner
      await queryRunner.release();
    }
  }

  async getUserTransactions(userId: number): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'factor'],
      order: { createdAt: 'DESC' },
    });
  }

  async getTransactionWithDetails(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['user', 'factor'],
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }
}
