
import React, { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import TransactionLineItems from './TransactionLineItems';
import { useTransactions } from '@/hooks/useTransactions';

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
  const { createTransaction } = useTransactions();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  
  // Generate a default reference number based on transaction type
  useEffect(() => {
    if (!reference) {
      const prefix = transactionType === 'journal' ? 'JE-' : 
                    transactionType === 'sale' ? 'INV-' :
                    transactionType === 'purchase' ? 'PUR-' :
                    transactionType === 'receipt' ? 'RCT-' :
                    'PMT-';
      
      const date = new Date();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      
      setReference(`${prefix}${date.getFullYear()}${month}${day}-${randomNum}`);
    }
  }, [transactionType, reference]);
  
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
      // If debit is set, clear credit and ensure value is a number
      newEntries[index] = { 
        ...newEntries[index],
        [field]: typeof value === 'string' ? parseFloat(value) || 0 : value,
        credit: 0
      };
    } else if (field === 'credit' && value !== 0) {
      // If credit is set, clear debit and ensure value is a number
      newEntries[index] = { 
        ...newEntries[index],
        [field]: typeof value === 'string' ? parseFloat(value) || 0 : value,
        debit: 0
      };
    } else {
      // For other fields
      newEntries[index] = { 
        ...newEntries[index],
        [field]: field === 'debit' || field === 'credit' 
          ? (typeof value === 'string' ? parseFloat(value) || 0 : value)
          : value
      };
    }
    
    setEntries(newEntries);
  };

  // Validate the form data
  const validateForm = () => {
    // Check if all entries have account selected
    if (entries.some(entry => !entry.accountId)) {
      toast({
        title: 'Validation Error',
        description: 'All entries must have an account selected.',
        variant: 'destructive'
      });
      return false;
    }

    // Check if transaction is balanced
    if (!isBalanced) {
      toast({
        title: 'Validation Error',
        description: 'Transaction must be balanced. Total debits must equal total credits.',
        variant: 'destructive'
      });
      return false;
    }

    // Check if there are at least two entries
    if (entries.length < 2) {
      toast({
        title: 'Validation Error',
        description: 'Transaction must have at least two entries.',
        variant: 'destructive'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Filter out empty entries
      const validEntries = entries.filter(
        entry => entry.accountId && (entry.debit > 0 || entry.credit > 0)
      );
      
      // Create transaction payload
      const transactionData = {
        date,
        type: transactionType,
        reference,
        description,
        entries: validEntries
      };
      
      // Save transaction
      await createTransaction(transactionData);
      
      // Show success message
      toast({
        title: 'Transaction Created',
        description: 'Your transaction has been recorded successfully.'
      });
      
      // Close the form
      onClose();
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create transaction. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={!isBalanced || isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isBalanced ? 'Save Transaction' : 'Entries Must Balance'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionForm;
