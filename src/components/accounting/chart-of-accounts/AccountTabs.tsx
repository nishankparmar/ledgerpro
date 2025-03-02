
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Account, AccountType, accountTypeLabels } from '@/types/accounting';
import AccountTypeTab from './AccountTypeTab';

interface AccountTabsProps {
  accounts: Account[];
  activeTab: AccountType;
  onTabChange: (value: AccountType) => void;
  onEditAccount: (account: Account) => void;
  onDeleteAccount: (accountId: string) => void;
  onAddAccount: () => void;
}

const AccountTabs: React.FC<AccountTabsProps> = ({
  accounts,
  activeTab,
  onTabChange,
  onEditAccount,
  onDeleteAccount,
  onAddAccount,
}) => {
  return (
    <Tabs 
      defaultValue="asset" 
      value={activeTab} 
      onValueChange={(value) => onTabChange(value as AccountType)}
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
          <AccountTypeTab 
            accounts={accounts}
            type={type as AccountType}
            onEditAccount={onEditAccount}
            onDeleteAccount={onDeleteAccount}
            onAddAccount={onAddAccount}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AccountTabs;
