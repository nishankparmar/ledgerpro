
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface AccountStatusFieldProps {
  isActive: boolean;
  onToggle: (checked: boolean) => void;
}

const AccountStatusField: React.FC<AccountStatusFieldProps> = ({ isActive, onToggle }) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="isActive" className="text-right">
        Active
      </Label>
      <div className="col-span-3 flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={isActive}
          onCheckedChange={onToggle}
        />
        <Label htmlFor="isActive" className="cursor-pointer">
          {isActive ? 'Active' : 'Inactive'}
        </Label>
      </div>
    </div>
  );
};

export default AccountStatusField;
