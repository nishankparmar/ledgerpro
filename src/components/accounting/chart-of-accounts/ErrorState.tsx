
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ErrorStateProps {
  error: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
        <h3 className="text-lg font-semibold">Error</h3>
        <p>{error}</p>
        <Button variant="outline" className="mt-2" onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;
