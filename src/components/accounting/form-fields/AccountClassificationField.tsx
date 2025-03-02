
import React from 'react';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { AccountClassification, accountClassificationLabels } from '@/types/accounting';

interface AccountClassificationFieldProps {
  value: AccountClassification;
  onValueChange: (value: AccountClassification) => void;
  availableClassifications: AccountClassification[];
  error?: string;
}

const AccountClassificationField: React.FC<AccountClassificationFieldProps> = ({ 
  value, 
  onValueChange, 
  availableClassifications,
  error 
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="classification" className="text-right">
        Classification
      </Label>
      <div className="col-span-3">
        <Select
          name="classification"
          value={value}
          onValueChange={(value) => onValueChange(value as AccountClassification)}
        >
          <SelectTrigger className={error ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select classification" />
          </SelectTrigger>
          <SelectContent>
            {availableClassifications.map((classification) => (
              <SelectItem key={classification} value={classification}>
                {accountClassificationLabels[classification]}
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

export default AccountClassificationField;
