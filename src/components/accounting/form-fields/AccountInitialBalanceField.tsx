
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AccountInitialBalanceFieldProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const AccountInitialBalanceField: React.FC<AccountInitialBalanceFieldProps> = ({ value, onChange, error }) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="initialBalance" className="text-right">
        Initial Balance (₹)
      </Label>
      <div className="col-span-3">
        <Input
          id="initialBalance"
          name="initialBalance"
          type="number"
          value={value}
          onChange={onChange}
          className={error ? 'border-red-500' : ''}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AccountInitialBalanceField;
