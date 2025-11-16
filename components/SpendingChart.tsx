import React, { useMemo } from 'react';
import { Expense } from '../types';

// Color palette for chart bars
const COLORS = [
  '#06b6d4', '#8b5cf6', '#ec4899', '#f97316', '#eab308', 
  '#22c55e', '#ef4444', '#14b8a6', '#6366f1', '#a855f7'
];

interface SpendingChartProps {
  expenses: Expense[];
}

const SpendingChart: React.FC<SpendingChartProps> = ({ expenses }) => {
  const chartData = useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return { items: [], maxValue: 0 };
    }

    const dataByCategory: { [key: string]: number } = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const items = Object.entries(dataByCategory)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const maxValue = Math.max(...items.map(item => item.value), 0);
    
    return { items, maxValue };
  }, [expenses]);

  const renderContent = () => {
    if (chartData.items.length === 0) {
      return <p className="text-slate-400 text-center py-10">No data to display. Add some expenses!</p>;
    }

    return (
      <div className="space-y-4 pt-2">
        {chartData.items.map((item, index) => {
          const barWidth = chartData.maxValue > 0 ? (item.value / chartData.maxValue) * 100 : 0;
          const barColor = COLORS[index % COLORS.length];
          
          return (
            <div key={item.name} className="group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-300 truncate">{item.name}</span>
                <span className="text-sm font-semibold text-slate-200">₹{item.value.toFixed(2)}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${barWidth}%`, backgroundColor: barColor }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 shadow-lg">
      <h2 className="text-xl font-bold text-slate-100 mb-2">Spending by Category</h2>
      <div className="w-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default SpendingChart;