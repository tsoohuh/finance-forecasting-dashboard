'use client';

import { useEffect, useState } from 'react';
import { getTransactions, generateForecast, getLatestForecast } from '@/lib/api';
import { Transaction, Forecast } from '@/lib/types';
import TransactionTable from '@/components/TransactionTable';
import ForecastChart from '@/components/ForecastChart';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError('');
      const [txs, fc] = await Promise.all([
        getTransactions(),
        getLatestForecast(),
      ]);
      setTransactions(txs);
      setForecast(fc);
    } catch (err) {
      setError('Failed to load data. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateForecast() {
    try {
      setGenerating(true);
      setError('');
      const result = await generateForecast();
      const updatedForecast = await getLatestForecast();
      setForecast(updatedForecast);
    } catch (err) {
      setError('Failed to generate forecast');
      console.error(err);
    } finally {
      setGenerating(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Financial Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your transactions and forecast future trends</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Transaction History */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b">
            <h2 className="text-2xl font-semibold">Transaction History</h2>
            <p className="text-sm text-gray-600 mt-1">{transactions.length} transactions</p>
          </div>
          <div className="p-6">
            {transactions.length > 0 ? (
              <TransactionTable transactions={transactions} />
            ) : (
              <p className="text-gray-500 text-center py-8">No transactions found</p>
            )}
          </div>
        </div>

        {/* Forecast Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold">Financial Forecast</h2>
              <p className="text-sm text-gray-600 mt-1">AI-powered predictions for the next 6 months</p>
            </div>
            <button
              onClick={handleGenerateForecast}
              disabled={generating || transactions.length === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {generating ? 'Generating...' : 'Generate Forecast'}
            </button>
          </div>
          <div className="p-6">
            {forecast && forecast.forecastedValues ? (
              <ForecastChart data={forecast.forecastedValues} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No forecast available</p>
                <p className="text-sm text-gray-400">Click "Generate Forecast" to create predictions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}