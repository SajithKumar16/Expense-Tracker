
import React, { useState, useMemo, useCallback } from 'react';
import { Expense } from './types';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SpendingChart from './components/SpendingChart';
import Header from './components/Header';
import { PlusIcon } from './components/Icons';

// Sample data for initial state
const getInitialExpenses = (): Expense[] => {
  const today = new Date();
  return [
    { id: '1', description: 'Groceries', amount: 75.50, category: 'Food', date: today.toISOString().split('T')[0] },
    { id: '2', description: 'Subway ticket', amount: 5.50, category: 'Transportation', date: new Date(today.setDate(today.getDate() - 1)).toISOString().split('T')[0] },
    { id: '3', description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', date: new Date(today.setDate(today.getDate() - 2)).toISOString().split('T')[0] },
    { id: '4', description: 'Electric Bill', amount: 120.00, category: 'Utilities', date: new Date(today.setDate(today.getDate() - 3)).toISOString().split('T')[0] },
    { id: '5', description: 'New running shoes', amount: 95.00, category: 'Shopping', date: new Date(today.setDate(today.getDate() - 4)).toISOString().split('T')[0] },
  ];
};


const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(getInitialExpenses());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleAddExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [...prev, { ...expense, id: Date.now().toString() }]);
    setIsFormOpen(false);
  }, []);

  const handleUpdateExpense = useCallback((updatedExpense: Expense) => {
    setExpenses(prev => prev.map(exp => (exp.id === updatedExpense.id ? updatedExpense : exp)));
    setEditingExpense(null);
    setIsFormOpen(false);
  }, []);

  const handleDeleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  }, []);

  const handleEditClick = useCallback((expense: Expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  }, []);

  const handleAddNewClick = () => {
    setEditingExpense(null);
    setIsFormOpen(true);
  };

  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans from-indigo-900/50 to-slate-900 bg-gradient-to-br">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">Your Expenses</h2>
                <p className="text-slate-400">Total: <span className="font-semibold text-cyan-400">₹{totalExpenses.toFixed(2)}</span></p>
              </div>
              <button
                onClick={handleAddNewClick}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <PlusIcon />
                Add Expense
              </button>
            </div>
            <ExpenseList
              expenses={expenses}
              onEdit={handleEditClick}
              onDelete={handleDeleteExpense}
            />
          </div>
          <div className="lg:col-span-1">
            <SpendingChart expenses={expenses} />
          </div>
        </div>
      </main>
      {isFormOpen && (
        <ExpenseForm
          onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
          expenseToEdit={editingExpense}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
