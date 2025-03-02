
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccounts } from '@/hooks/useAccounts';
import { Account, AccountType, accountTypeLabels } from '@/types/accounting';
import { formatRupees } from '@/utils/currency';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Edit, Trash2 } from 'lucide-react';
import AccountForm from '@/components/accounting/AccountForm';

const ChartOfAccounts: React.FC = () => {
  const navigate = useNavigate();
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

  // Filter accounts by the active tab (account type)
  const filteredAccounts = accounts.filter(account => account.type === activeTab);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-ledger-500 border-b-ledger-300 border-l-ledger-300 border-r-ledger-300 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-ledger-700 font-medium">Loading accounts...</p>
        </div>
      </div>
    );
  }

  if (error) {
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
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
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
            onClick={() => {
              setEditingAccount(null);
              setIsFormOpen(true);
            }}
            className="flex items-center"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Account
          </Button>
        </div>
      </div>

      {/* Account type tabs */}
      <Tabs 
        defaultValue="asset" 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as AccountType)}
        className="mb-6"
      >
        <TabsList className="grid grid-cols-5 w-full">
          {Object.entries(accountTypeLabels).map(([type, label]) => (
            <TabsTrigger key={type} value={type}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {/* Tab content panels */}
        {Object.keys(accountTypeLabels).map((type) => (
          <TabsContent key={type} value={type} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{accountTypeLabels[type as AccountType]} Accounts</CardTitle>
                <CardDescription>
                  {type === 'asset' && 'Resources owned by the business'}
                  {type === 'liability' && 'Obligations owed to others'}
                  {type === 'equity' && 'Ownership interest in the business'}
                  {type === 'income' && 'Revenue from business activities'}
                  {type === 'expense' && 'Costs incurred in business operations'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredAccounts.length === 0 ? (
                  <div className="text-center py-8 text-ledger-500">
                    <p>No {accountTypeLabels[type as AccountType].toLowerCase()} accounts found.</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => {
                        setEditingAccount(null);
                        setIsFormOpen(true);
                      }}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Add an Account
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 font-medium">Code</th>
                          <th className="pb-2 font-medium">Name</th>
                          <th className="pb-2 font-medium">Classification</th>
                          <th className="pb-2 font-medium text-right">Balance</th>
                          <th className="pb-2 font-medium">Status</th>
                          <th className="pb-2 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAccounts.map((account) => (
                          <tr key={account.id} className="border-b hover:bg-ledger-50">
                            <td className="py-3 font-mono">{account.code}</td>
                            <td className="py-3 font-medium">{account.name}</td>
                            <td className="py-3 capitalize">
                              {account.classification.replace(/-/g, ' ')}
                            </td>
                            <td className="py-3 text-right font-mono">
                              {formatRupees(account.balance)}
                            </td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                account.isActive 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {account.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleEditAccount(account)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleDeleteAccount(account.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

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
