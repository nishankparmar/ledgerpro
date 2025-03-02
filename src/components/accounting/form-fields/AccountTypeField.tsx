
import React from 'react';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { AccountType, accountTypeLabels } from '@/types/accounting';

interface AccountTypeFieldProps {
  value: AccountType;
  onValueChange: (value: AccountType) => void;
  error?: string;
}

const AccountTypeField: React.FC<AccountTypeFieldProps> = ({ value, onValueChange, error }) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="type" className="text-right">
        Type
      </Label>
      <div className="col-span-3">
        <Select
          name="type"
          value={value}
          onValueChange={(value) => onValueChange(value as AccountType)}
        >
          <SelectTrigger className={error ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(accountTypeLabels).map(([type, label]) => (
              <SelectItem key={type} value={type}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AccountTypeField;
