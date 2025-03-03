
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Account } from '@/types/accounting';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface TransactionEntry {
  accountId: string;
  description: string;
  debit: number;
  credit: number;
}

interface TransactionLineItemsProps {
  entries: TransactionEntry[];
  accounts: Account[];
  onAddEntry: () => void;
  onRemoveEntry: (index: number) => void;
  onEntryChange: (index: number, field: keyof TransactionEntry, value: string | number) => void;
}

const TransactionLineItems: React.FC<TransactionLineItemsProps> = ({
  entries,
  accounts,
  onAddEntry,
  onRemoveEntry,
  onEntryChange
}) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted text-muted-foreground text-xs">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Account</th>
            <th className="px-4 py-2 text-left font-medium">Description</th>
            <th className="px-4 py-2 text-right font-medium">Debit</th>
            <th className="px-4 py-2 text-right font-medium">Credit</th>
            <th className="px-4 py-2 text-center font-medium w-10">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {entries.map((entry, index) => (
            <tr key={index} className="bg-card">
              <td className="px-4 py-2">
                <Select
                  value={entry.accountId}
                  onValueChange={(value) => onEntryChange(index, 'accountId', value)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>
              <td className="px-4 py-2">
                <Textarea 
                  value={entry.description}
                  onChange={(e) => onEntryChange(index, 'description', e.target.value)}
                  className="h-8 min-h-[2rem] py-1"
                  placeholder="Description"
                />
              </td>
              <td className="px-4 py-2">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={entry.debit || ''}
                  onChange={(e) => onEntryChange(index, 'debit', parseFloat(e.target.value) || 0)}
                  className="h-8 text-right"
                  placeholder="0.00"
                />
              </td>
              <td className="px-4 py-2">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={entry.credit || ''}
                  onChange={(e) => onEntryChange(index, 'credit', parseFloat(e.target.value) || 0)}
                  className="h-8 text-right"
                  placeholder="0.00"
                />
              </td>
              <td className="px-4 py-2 text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveEntry(index)}
                  disabled={entries.length <= 2}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={5} className="px-4 py-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full flex items-center justify-center"
                onClick={onAddEntry}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Line
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionLineItems;
