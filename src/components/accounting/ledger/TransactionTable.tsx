
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow, 
} from '@/components/ui/table';
import { formatCurrency } from '@/utils/currency';
import { useTransactions } from '@/hooks/useTransactions';
import { 
  MoreHorizontal, 
  FileText, 
  Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Transaction } from '@/services/transactionsService';

interface TransactionTableProps {
  filterType?: string;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ filterType }) => {
  const { 
    transactions, 
    loading, 
    error, 
    deleteTransaction 
  } = useTransactions();

  // Filter transactions by type if filterType is provided
  const filteredTransactions = filterType 
    ? transactions.filter(t => t.type.toLowerCase() === filterType.toLowerCase())
    : transactions;

  // Calculate the total amount for a transaction (sum of all debits or credits)
  const calculateTransactionAmount = (transaction: Transaction) => {
    // We can use either the sum of debits or credits since they should be equal
    return transaction.entries.reduce((sum, entry) => sum + entry.debit, 0);
  };

  // Handle transaction deletion
  const handleDeleteTransaction = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction? This action cannot be undone.')) {
      try {
        await deleteTransaction(id);
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading transactions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (filteredTransactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg font-medium">No transactions found</p>
        <p className="text-sm">
          {filterType 
            ? `No ${filterType.toLowerCase()} transactions exist yet.` 
            : 'No transactions have been recorded yet.'}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Account Details</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <span className="capitalize">{transaction.type}</span>
              </TableCell>
              <TableCell>{transaction.reference}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                {transaction.entries.length > 0 && (
                  <span className="text-xs">
                    {transaction.entries.length} {transaction.entries.length === 1 ? 'entry' : 'entries'}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right font-mono">
                {formatCurrency(calculateTransactionAmount(transaction))}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => console.log('View transaction details', transaction.id)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
