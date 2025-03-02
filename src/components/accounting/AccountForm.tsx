
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAccounts } from '@/hooks/useAccounts';
import {
  Account,
  AccountType,
  CreateAccountPayload,
  UpdateAccountPayload,
  accountTypeLabels,
  accountClassifications,
  accountClassificationLabels
} from '@/types/accounting';
import { useForm } from '@/hooks/useForm';
import { useToast } from '@/hooks/use-toast';

interface AccountFormProps {
  account: Account | null;
  isOpen: boolean;
  onClose: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({ account, isOpen, onClose }) => {
  const { createAccount, updateAccount } = useAccounts();
  const { toast } = useToast();
  const [availableClassifications, setAvailableClassifications] = useState<string[]>([]);
  
  // Set up form with initial values
  const initialValues = account 
    ? { 
        code: account.code, 
        name: account.name, 
        type: account.type, 
        classification: account.classification, 
        description: account.description || '', 
        isActive: account.isActive,
        initialBalance: 0  // Not editable for existing accounts
      } 
    : { 
        code: '', 
        name: '', 
        type: 'asset' as AccountType, 
        classification: 'current-asset', 
        description: '',
        isActive: true,
        initialBalance: 0
      };
  
  const { 
    values, 
    errors, 
    handleChange, 
    handleSubmit, 
    setValues, 
    setErrors 
  } = useForm(initialValues);

  // Update available classifications when account type changes
  useEffect(() => {
    if (values.type) {
      const classifications = accountClassifications[values.type as AccountType];
      setAvailableClassifications(classifications);
      
      // If current classification is not valid for the new type, reset it
      if (!classifications.includes(values.classification)) {
        setValues({ ...values, classification: classifications[0] });
      }
    }
  }, [values.type, setValues]);

  // Validation function
  const validateForm = (formValues: typeof initialValues) => {
    const newErrors: Record<string, string> = {};
    
    if (!formValues.code.trim()) {
      newErrors.code = 'Account code is required';
    } else if (!/^\d+$/.test(formValues.code)) {
      newErrors.code = 'Account code must contain only numbers';
    }
    
    if (!formValues.name.trim()) {
      newErrors.name = 'Account name is required';
    }
    
    if (!formValues.type) {
      newErrors.type = 'Account type is required';
    }
    
    if (!formValues.classification) {
      newErrors.classification = 'Account classification is required';
    }
    
    if (!account && formValues.initialBalance < 0) {
      newErrors.initialBalance = 'Initial balance cannot be negative';
    }
    
    return newErrors;
  };

  // Submit handler
  const onSubmit = async () => {
    try {
      const validationErrors = validateForm(values);
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      
      if (account) {
        // Update existing account
        const updateData: UpdateAccountPayload = {
          code: values.code,
          name: values.name,
          type: values.type as AccountType,
          classification: values.classification,
          description: values.description,
          isActive: values.isActive
        };
        
        await updateAccount(account.id, updateData);
        toast({
          title: 'Account Updated',
          description: `${values.name} has been updated successfully.`
        });
      } else {
        // Create new account
        const newAccountData: CreateAccountPayload = {
          code: values.code,
          name: values.name,
          type: values.type as AccountType,
          classification: values.classification,
          description: values.description,
          isActive: values.isActive,
          initialBalance: values.initialBalance
        };
        
        await createAccount(newAccountData);
        toast({
          title: 'Account Created',
          description: `${values.name} has been created successfully.`
        });
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving account:', error);
      toast({
        title: 'Error',
        description: 'Failed to save account. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {account ? `Edit Account: ${account.name}` : 'Create New Account'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Account Code */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <div className="col-span-3">
                <Input
                  id="code"
                  name="code"
                  value={values.code}
                  onChange={handleChange}
                  className={errors.code ? 'border-red-500' : ''}
                />
                {errors.code && (
                  <p className="text-red-500 text-sm mt-1">{errors.code}</p>
                )}
              </div>
            </div>
            
            {/* Account Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            </div>
            
            {/* Account Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <div className="col-span-3">
                <Select
                  name="type"
                  value={values.type}
                  onValueChange={(value) => setValues({ ...values, type: value as AccountType })}
                >
                  <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
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
                {errors.type && (
                  <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                )}
              </div>
            </div>
            
            {/* Account Classification */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="classification" className="text-right">
                Classification
              </Label>
              <div className="col-span-3">
                <Select
                  name="classification"
                  value={values.classification}
                  onValueChange={(value) => setValues({ ...values, classification: value })}
                >
                  <SelectTrigger className={errors.classification ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select classification" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableClassifications.map((classification) => (
                      <SelectItem key={classification} value={classification}>
                        {accountClassificationLabels[classification as keyof typeof accountClassificationLabels]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.classification && (
                  <p className="text-red-500 text-sm mt-1">{errors.classification}</p>
                )}
              </div>
            </div>
            
            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </div>
            
            {/* Initial Balance - only for new accounts */}
            {!account && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="initialBalance" className="text-right">
                  Initial Balance (₹)
                </Label>
                <div className="col-span-3">
                  <Input
                    id="initialBalance"
                    name="initialBalance"
                    type="number"
                    value={values.initialBalance}
                    onChange={handleChange}
                    className={errors.initialBalance ? 'border-red-500' : ''}
                  />
                  {errors.initialBalance && (
                    <p className="text-red-500 text-sm mt-1">{errors.initialBalance}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Active Status */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isActive" className="text-right">
                Active
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={values.isActive}
                  onCheckedChange={(checked) => setValues({ ...values, isActive: checked })}
                />
                <Label htmlFor="isActive" className="cursor-pointer">
                  {values.isActive ? 'Active' : 'Inactive'}
                </Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {account ? 'Save Changes' : 'Create Account'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountForm;
