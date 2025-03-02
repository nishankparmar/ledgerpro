
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AccountNameFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const AccountNameField: React.FC<AccountNameFieldProps> = ({ value, onChange, error }) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
        Name
      </Label>
      <div className="col-span-3">
        <Input
          id="name"
          name="name"
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

export default AccountNameField;
