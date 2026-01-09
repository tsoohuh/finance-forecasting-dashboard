import { Transaction } from '@/lib/types';

export default function TransactionTable({ 
  transactions 
}: { 
  transactions: Transaction[] 
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr 
              key={tx.id} 
              className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <td className="px-4 py-4 text-gray-600">
                {new Date(tx.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </td>
              <td className="px-4 py-4">
                <span className={`font-semibold ${
                  tx.category === 'income' ? 'text-green-600' : 'text-gray-900'
                }`}>
                  {tx.category === 'income' ? '+' : ''}${parseFloat(tx.amount.toString()).toFixed(2)}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  tx.category === 'income' ? 'bg-green-100 text-green-700' :
                  tx.category === 'expense' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {tx.category.charAt(0).toUpperCase() + tx.category.slice(1)}
                </span>
              </td>
              <td className="px-4 py-4 text-gray-600">{tx.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}