
export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string; // Storing date as 'YYYY-MM-DD' string for simplicity with input[type=date]
}
