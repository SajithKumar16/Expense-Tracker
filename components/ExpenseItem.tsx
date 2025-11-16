
import React from 'react';
import { Expense } from '../types';
import { EditIcon, TrashIcon } from './Icons';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const categoryColors: { [key: string]: string } = {
  Food: 'bg-green-500/20 text-green-300 border-green-500/30',
  Transportation: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  Housing: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  Utilities: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  Entertainment: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Shopping: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  Health: 'bg-red-500/20 text-red-300 border-red-500/30',
  'Personal Care': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  Education: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  Other: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onEdit, onDelete }) => {
  const formattedDate = new Date(expense.date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const categoryColor = categoryColors[expense.category] || categoryColors['Other'];

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 flex items-center justify-between shadow-md hover:bg-slate-800 transition-colors duration-200 border border-slate-700/50">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${categoryColor}`}>
            {expense.category}
          </span>
        </div>
        <div>
          <p className="font-semibold text-slate-100">{expense.description}</p>
          <p className="text-sm text-slate-400">{formattedDate}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-lg font-bold text-cyan-400">₹{expense.amount.toFixed(2)}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(expense)}
            className="p-2 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Edit expense"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => onDelete(expense.id)}
            className="p-2 rounded-full hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors"
            aria-label="Delete expense"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
