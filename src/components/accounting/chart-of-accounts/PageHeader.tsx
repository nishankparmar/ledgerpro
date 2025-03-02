
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  onAddAccount: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onAddAccount }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-ledger-800">Chart of Accounts</h1>
        <p className="text-ledger-500">Manage your accounting structure</p>
      </div>
      <div className="flex items-center gap-3">
        <Button 
          onClick={() => navigate('/ledger')}
          variant="outline"
          className="flex items-center"
        >
          <FileText className="mr-2 h-4 w-4" />
          General Ledger
        </Button>
        <Button 
          onClick={onAddAccount}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Account
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
