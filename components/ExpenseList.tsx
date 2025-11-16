
import React from 'react';
import { Expense } from '../types';
import ExpenseItem from './ExpenseItem';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onEdit, onDelete }) => {
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (expenses.length === 0) {
    return (
      <div className="bg-slate-800/50 rounded-lg p-8 text-center border-2 border-dashed border-slate-700">
        <h3 className="text-lg font-semibold text-slate-300">No expenses yet!</h3>
        <p className="text-slate-400 mt-2">Click "Add Expense" to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedExpenses.map(expense => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
