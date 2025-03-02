
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface AccountDescriptionFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AccountDescriptionField: React.FC<AccountDescriptionFieldProps> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="description" className="text-right">
        Description
      </Label>
      <div className="col-span-3">
        <Textarea
          id="description"
          name="description"
          value={value}
          onChange={onChange}
          rows={3}
        />
      </div>
    </div>
  );
};

export default AccountDescriptionField;
