import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MlClientService {
  private mlServiceUrl = process.env.ML_SERVICE_URL || 'http://localhost:8000';

  async predict(transactionHistory: any[]): Promise<any> {
    try {
      const response = await axios.post(
        `${this.mlServiceUrl}/predict`,
        { data: transactionHistory },
        { timeout: 10000 },
      );
      return response.data;
    } catch (error) {
      console.error('ML Service error:', error.message);
      throw new Error('Failed to generate forecast');
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await axios.get(`${this.mlServiceUrl}/`, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}