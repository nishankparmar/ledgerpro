
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AccountCodeFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const AccountCodeField: React.FC<AccountCodeFieldProps> = ({ value, onChange, error }) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="code" className="text-right">
        Code
      </Label>
      <div className="col-span-3">
        <Input
          id="code"
          name="code"
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

export default AccountCodeField;
