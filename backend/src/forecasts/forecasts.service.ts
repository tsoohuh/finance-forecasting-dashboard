import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Forecast } from './forecast.entity';
import { TransactionsService } from '../transactions/transactions.service';
import { MlClientService } from '../ml-client/ml-client.service';

@Injectable()
export class ForecastsService {
  constructor(
    @InjectRepository(Forecast)
    private forecastsRepo: Repository<Forecast>,
    private transactionsService: TransactionsService,
    private mlClientService: MlClientService,
  ) {}

  async generateForecast(userId: string): Promise<any> {
    // Get user's transaction history
    const transactions = await this.transactionsService.findAll();

    // Call ML service
    const forecast = await this.mlClientService.predict(transactions);

    // Save forecast to DB
    const savedForecast = await this.forecastsRepo.save({
      userId,
      forecastedValues: forecast.forecast,
      modelVersion: 'v1.0',
    });

    return {
      forecast: forecast.forecast,
      savedForecastId: savedForecast.id,
    };
  }

  async getLatestForecast(userId: string): Promise<Forecast | null> {
    return this.forecastsRepo.findOne({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }
}