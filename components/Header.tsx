
import React from 'react';
import { WalletIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm p-4 border-b border-slate-700/50 sticky top-0 z-20">
      <div className="container mx-auto flex items-center gap-3">
        <WalletIcon />
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
          Expense Tracker
        </h1>
      </div>
    </header>
  );
};

export default Header;