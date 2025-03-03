
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Account } from '@/types/accounting';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import TransactionLineItems from './TransactionLineItems';

interface TransactionFormProps {
  accounts: Account[];
  isOpen: boolean;
  onClose: () => void;
}

// Define the transaction entry interface
interface TransactionEntry {
  accountId: string;
  description: string;
  debit: number;
  credit: number;
}

const transactionTypes = [
  { value: 'journal', label: 'Journal Entry' },
  { value: 'sale', label: 'Sales Invoice' },
  { value: 'purchase', label: 'Purchase Invoice' },
  { value: 'receipt', label: 'Receipt' },
  { value: 'payment', label: 'Payment' },
];

const TransactionForm: React.FC<TransactionFormProps> = ({ accounts, isOpen, onClose }) => {
  const [transactionType, setTransactionType] = useState('journal');
  const [reference, setReference] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [entries, setEntries] = useState<TransactionEntry[]>([
    { accountId: '', description: '', debit: 0, credit: 0 },
    { accountId: '', description: '', debit: 0, credit: 0 }
  ]);
  
  // Calculate totals
  const totalDebits = entries.reduce((sum, entry) => sum + (entry.debit || 0), 0);
  const totalCredits = entries.reduce((sum, entry) => sum + (entry.credit || 0), 0);
  const isBalanced = totalDebits === totalCredits && totalDebits > 0;
  
  const handleAddEntry = () => {
    setEntries([...entries, { accountId: '', description: '', debit: 0, credit: 0 }]);
  };
  
  const handleRemoveEntry = (index: number) => {
    if (entries.length <= 2) return; // Keep at least two entries
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };
  
  const handleEntryChange = (index: number, field: keyof TransactionEntry, value: string | number) => {
    const newEntries = [...entries];
    
    if (field === 'debit' && value !== 0) {
      // If debit is set, clear credit
      newEntries[index] = { 
        ...newEntries[index],
        [field]: value,
        credit: 0
      };
    } else if (field === 'credit' && value !== 0) {
      // If credit is set, clear debit
      newEntries[index] = { 
        ...newEntries[index],
        [field]: value,
        debit: 0
      };
    } else {
      newEntries[index] = { 
        ...newEntries[index],
        [field]: value
      };
    }
    
    setEntries(newEntries);
  };

  const handleSubmit = () => {
    // Eventually this will save the transaction to the database
    console.log({
      type: transactionType,
      reference,
      date,
      description,
      entries
    });
    
    // Close the form
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create New Transaction</DialogTitle>
          <DialogDescription>
            Enter the transaction details below. All transactions must follow double-entry accounting principles.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="grid gap-2">
            <Label htmlFor="transaction-type">Transaction Type</Label>
            <Select 
              value={transactionType}
              onValueChange={setTransactionType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent>
                {transactionTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="reference">Reference Number</Label>
            <Input
              id="reference"
              placeholder="e.g., INV-001, JE-123"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter transaction description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={1}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">Transaction Line Items</h3>
          <TransactionLineItems 
            entries={entries}
            accounts={accounts}
            onAddEntry={handleAddEntry}
            onRemoveEntry={handleRemoveEntry}
            onEntryChange={handleEntryChange}
          />
          
          <div className="flex justify-end gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">Total Debits:</span>
              <span className={`${!isBalanced && totalDebits > 0 ? 'text-red-500' : ''}`}>
                {totalDebits.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Total Credits:</span>
              <span className={`${!isBalanced && totalCredits > 0 ? 'text-red-500' : ''}`}>
                {totalCredits.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Difference:</span>
              <span className={`${Math.abs(totalDebits - totalCredits) > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {Math.abs(totalDebits - totalCredits).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!isBalanced}
          >
            {isBalanced ? 'Save Transaction' : 'Entries Must Balance'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionForm;
