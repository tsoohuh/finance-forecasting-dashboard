import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForecastsController } from './forecasts.controller';
import { ForecastsService } from './forecasts.service';
import { Forecast } from './forecast.entity';
import { TransactionsModule } from '../transactions/transactions.module';
import { MlClientService } from '../ml-client/ml-client.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Forecast]),
    TransactionsModule, // Import to use TransactionsService
  ],
  controllers: [ForecastsController],
  providers: [ForecastsService, MlClientService],
  exports: [ForecastsService],
})
export class ForecastsModule {}