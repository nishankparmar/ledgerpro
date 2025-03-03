
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

// Placeholder transaction data
const mockTransactions = [
  {
    id: '1',
    date: '2023-05-15',
    type: 'Sales Invoice',
    reference: 'INV-001',
    description: 'Sales to ABC Company',
    amount: 1250.00,
    debitAccount: 'Accounts Receivable',
    creditAccount: 'Sales Revenue',
  },
  {
    id: '2',
    date: '2023-05-18',
    type: 'Payment',
    reference: 'PMT-001',
    description: 'Office supplies payment',
    amount: 350.00,
    debitAccount: 'Office Supplies',
    creditAccount: 'Cash',
  },
  {
    id: '3',
    date: '2023-05-20',
    type: 'Receipt',
    reference: 'RCT-001',
    description: 'Payment received from ABC Company',
    amount: 1250.00,
    debitAccount: 'Cash',
    creditAccount: 'Accounts Receivable',
  },
  {
    id: '4',
    date: '2023-05-25',
    type: 'Journal Entry',
    reference: 'JE-001',
    description: 'Monthly depreciation',
    amount: 500.00,
    debitAccount: 'Depreciation Expense',
    creditAccount: 'Accumulated Depreciation',
  },
];

const TransactionTable: React.FC = () => {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Debit Account</TableHead>
            <TableHead>Credit Account</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.reference}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.debitAccount}</TableCell>
              <TableCell>{transaction.creditAccount}</TableCell>
              <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
