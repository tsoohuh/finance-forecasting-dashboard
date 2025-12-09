export interface Transaction {
  id: string;
  date: string;
  amount: string | number;
  category: string;
  description: string;
  userId: string;
}

export interface ForecastValue {
  date: string;
  value: number;
}

export interface Forecast {
  id: string;
  userId: string;
  forecastedValues: ForecastValue[];
  createdAt: string;
  modelVersion: string;
}