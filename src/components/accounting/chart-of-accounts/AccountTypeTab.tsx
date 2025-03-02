
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Account, AccountType, accountTypeLabels } from '@/types/accounting';
import { formatRupees } from '@/utils/currency';

interface AccountTypeTabProps {
  accounts: Account[];
  type: AccountType;
  onEditAccount: (account: Account) => void;
  onDeleteAccount: (accountId: string) => void;
  onAddAccount: () => void;
}

const AccountTypeTab: React.FC<AccountTypeTabProps> = ({
  accounts,
  type,
  onEditAccount,
  onDeleteAccount,
  onAddAccount,
}) => {
  // Filter accounts by type
  const filteredAccounts = accounts.filter(account => account.type === type);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{accountTypeLabels[type]} Accounts</CardTitle>
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
            <p>No {accountTypeLabels[type].toLowerCase()} accounts found.</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={onAddAccount}
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
                          onClick={() => onEditAccount(account)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => onDeleteAccount(account.id)}
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
  );
};

export default AccountTypeTab;
