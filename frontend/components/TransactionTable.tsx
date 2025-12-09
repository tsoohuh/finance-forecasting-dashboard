import { Transaction } from '@/lib/types';

export default function TransactionTable({ 
  transactions 
}: { 
  transactions: Transaction[] 
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Date</th>
            <th className="px-4 py-3 text-left font-semibold">Amount</th>
            <th className="px-4 py-3 text-left font-semibold">Category</th>
            <th className="px-4 py-3 text-left font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">
                {new Date(tx.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 font-semibold">
                ${parseFloat(tx.amount.toString()).toFixed(2)}
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded text-xs ${
                  tx.category === 'income' ? 'bg-green-100 text-green-800' :
                  tx.category === 'expense' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {tx.category}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-600">{tx.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}