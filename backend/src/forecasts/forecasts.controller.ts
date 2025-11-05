import { Controller, Post, Body, Get, NotFoundException } from '@nestjs/common';
import { ForecastsService } from './forecasts.service';

@Controller('api/forecasts')
export class ForecastsController {
  constructor(private readonly forecastsService: ForecastsService) {}

  @Post('generate')
  async generateForecast(
    @Body() body: { userId?: string },
  ): Promise<{ forecast: any; savedForecastId: string }> {
    const userId = body.userId || 'mock-user-1';
    const result = await this.forecastsService.generateForecast(userId);
    return result;
  }

  @Get('latest')
  async getLatestForecast() {
    const forecast = await this.forecastsService.getLatestForecast('mock-user-1');
    
    if (!forecast) {
      throw new NotFoundException('No forecast found. Generate one first.');
    }
    
    return forecast;
  }
}