import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';

@Controller('api/transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getAll(): Promise<Transaction[]> {
    return this.transactionsService.findAll();
  }

  @Post('seed')
  async seedData(): Promise<{ message: string; count: number }> {
    const count = await this.transactionsService.seedMockData();
    return { message: 'Mock data seeded', count };
  }
}