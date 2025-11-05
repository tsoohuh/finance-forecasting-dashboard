import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepo: Repository<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.transactionsRepo.find({
      where: { userId: 'mock-user-1' },
      order: { date: 'ASC' },
    });
  }

  async seedMockData(): Promise<number> {
    const categories = ['income', 'expense', 'savings'];
    const descriptions = [
      'Salary',
      'Groceries',
      'Utilities',
      'Entertainment',
      'Transport',
    ];

    // Generate 24 months of mock data
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const amount = Math.random() * 2000 + 500;
      const category = categories[Math.floor(Math.random() * categories.length)];
      const desc = descriptions[Math.floor(Math.random() * descriptions.length)];

      await this.transactionsRepo.save({
        date,
        amount,
        category,
        description: desc,
        userId: 'mock-user-1',
      });
    }

    return this.transactionsRepo.count();
  }
}