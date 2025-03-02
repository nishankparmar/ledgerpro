
import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-ledger-500 border-b-ledger-300 border-l-ledger-300 border-r-ledger-300 rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-ledger-700 font-medium">Loading accounts...</p>
      </div>
    </div>
  );
};

export default LoadingState;
