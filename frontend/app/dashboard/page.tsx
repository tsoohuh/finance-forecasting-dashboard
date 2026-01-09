'use client';

import { useEffect, useState } from 'react';
import { getTransactions, generateForecast, getLatestForecast } from '@/lib/api';
import { Transaction, Forecast } from '@/lib/types';
import TransactionTable from '@/components/TransactionTable';
import ForecastChart from '@/components/ForecastChart';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';

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
      await generateForecast();
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalTransactions = transactions.length;
  const totalIncome = transactions
    .filter(t => t.category === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);
  const totalExpenses = transactions
    .filter(t => t.category === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0);
  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            FinInsights
          </Link>
          <div className="flex gap-4 items-center">
            <span className="text-sm text-gray-600">mock-user-1</span>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
              MU
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Financial Dashboard</h1>
          <p className="text-gray-600">Track your transactions and forecast future trends with AI-powered insights</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            label="Total Transactions" 
            value={totalTransactions.toString()} 
            icon="📝"
            color="blue"
          />
          <StatCard 
            label="Total Income" 
            value={`$${totalIncome.toFixed(2)}`} 
            icon="💰"
            color="green"
          />
          <StatCard 
            label="Total Expenses" 
            value={`$${totalExpenses.toFixed(2)}`} 
            icon="💸"
            color="red"
          />
          <StatCard 
            label="Net Balance" 
            value={`$${netBalance.toFixed(2)}`} 
            icon="📊"
            color={netBalance >= 0 ? 'green' : 'red'}
          />
        </div>

        {/* Forecast Section */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex justify-between items-center">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-1">Financial Forecast</h2>
              <p className="text-blue-100">AI-powered predictions for the next 6 months</p>
            </div>
            <button
              onClick={handleGenerateForecast}
              disabled={generating || transactions.length === 0}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              {generating ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  Generating...
                </>
              ) : (
                <>
                  <span>🤖</span>
                  Generate Forecast
                </>
              )}
            </button>
          </div>
          <div className="p-8">
            {forecast && forecast.forecastedValues ? (
              <ForecastChart data={forecast.forecastedValues} />
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📈</div>
                <p className="text-gray-600 text-lg mb-2">No forecast available</p>
                <p className="text-sm text-gray-400">Click "Generate Forecast" to create AI-powered predictions</p>
              </div>
            )}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="px-8 py-6 border-b bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
            <p className="text-sm text-gray-600 mt-1">
              {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} recorded
            </p>
          </div>
          <div className="p-8">
            {transactions.length > 0 ? (
              <TransactionTable transactions={transactions} />
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-600 text-lg">No transactions found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  icon, 
  color 
}: { 
  label: string; 
  value: string; 
  icon: string; 
  color: 'blue' | 'green' | 'red';
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{icon}</span>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} opacity-10`}></div>
      </div>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}