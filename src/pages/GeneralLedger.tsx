
import React, { useState } from 'react';
import { useAccounts } from '@/hooks/useAccounts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Download, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionTable from '@/components/accounting/ledger/TransactionTable';
import TransactionForm from '@/components/accounting/ledger/TransactionForm';
import { useTransactions } from '@/hooks/useTransactions';

const GeneralLedger: React.FC = () => {
  const { accounts, loading: accountsLoading } = useAccounts();
  const { loading: transactionsLoading } = useTransactions();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const isLoading = accountsLoading || transactionsLoading;

  // Function to export transactions to CSV
  const exportTransactions = () => {
    alert('Export feature will be implemented soon.');
    // This would typically generate a CSV and trigger a download
  };

  // Function to handle filter button
  const handleFilterClick = () => {
    alert('Filter feature will be implemented soon.');
    // This would typically open a filter modal/drawer
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ledger-800">General Ledger</h1>
          <p className="text-ledger-500 mt-1">Record and manage financial transactions</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={handleFilterClick}
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={exportTransactions}
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button 
            className="flex items-center gap-1"
            onClick={() => setIsFormOpen(true)}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4" />
            <span>New Transaction</span>
          </Button>
        </div>
      </div>
      
      <Tabs 
        defaultValue="all" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="w-full overflow-x-auto flex flex-nowrap md:flex-wrap">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="journal">Journal Entries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>View and manage all financial transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading transactions...</span>
                </div>
              ) : (
                <TransactionTable />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sales">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Sales Transactions</CardTitle>
              <CardDescription>View and manage sales invoices and receipts</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading sales transactions...</span>
                </div>
              ) : (
                <TransactionTable filterType="sale" />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="purchases">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Purchase Transactions</CardTitle>
              <CardDescription>View and manage purchase invoices and payments</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading purchase transactions...</span>
                </div>
              ) : (
                <TransactionTable filterType="purchase" />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="receipts">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Receipt Transactions</CardTitle>
              <CardDescription>View and manage money received</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading receipt transactions...</span>
                </div>
              ) : (
                <TransactionTable filterType="receipt" />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Payment Transactions</CardTitle>
              <CardDescription>View and manage money paid</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading payment transactions...</span>
                </div>
              ) : (
                <TransactionTable filterType="payment" />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="journal">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Journal Entries</CardTitle>
              <CardDescription>View and manage manual journal entries</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading journal entries...</span>
                </div>
              ) : (
                <TransactionTable filterType="journal" />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {isFormOpen && (
        <TransactionForm 
          accounts={accounts}
          isOpen={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
};

export default GeneralLedger;
