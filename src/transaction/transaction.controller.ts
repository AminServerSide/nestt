import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { AdminGuard } from '../user/guards/admin.guard';

@Controller('transactions')
@UseGuards(AdminGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('process-payment')
  async processPayment(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionService.processPayment(createTransactionDto);
  }

  @Get('user/:userId')
  async getUserTransactions(@Param('userId') userId: string): Promise<Transaction[]> {
    return this.transactionService.getUserTransactions(parseInt(userId));
  }

  @Get(':id')
  async getTransaction(@Param('id') id: string): Promise<Transaction> {
    return this.transactionService.getTransactionWithDetails(parseInt(id));
  }
}
