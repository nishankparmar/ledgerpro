
import React, { useState } from 'react';
import { useAccounts } from '@/hooks/useAccounts';
import { Account, AccountType } from '@/types/accounting';
import AccountForm from '@/components/accounting/AccountForm';
import { 
  AccountTabs, 
  PageHeader, 
  LoadingState, 
  ErrorState 
} from '@/components/accounting/chart-of-accounts';

const ChartOfAccounts: React.FC = () => {
  const { accounts, loading, error, deleteAccount } = useAccounts();
  const [activeTab, setActiveTab] = useState<AccountType>('asset');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  // Function to handle editing an account
  const handleEditAccount = (account: Account) => {
    setEditingAccount(account);
    setIsFormOpen(true);
  };

  // Function to handle deleting an account
  const handleDeleteAccount = async (accountId: string) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      await deleteAccount(accountId);
    }
  };

  // Function to close the form
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAccount(null);
  };

  // Function to handle adding a new account
  const handleAddAccount = () => {
    setEditingAccount(null);
    setIsFormOpen(true);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      <PageHeader onAddAccount={handleAddAccount} />
      
      <AccountTabs
        accounts={accounts}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onEditAccount={handleEditAccount}
        onDeleteAccount={handleDeleteAccount}
        onAddAccount={handleAddAccount}
      />

      {/* Account form dialog */}
      {isFormOpen && (
        <AccountForm 
          account={editingAccount} 
          isOpen={isFormOpen} 
          onClose={handleCloseForm} 
        />
      )}
    </div>
  );
};

export default ChartOfAccounts;
