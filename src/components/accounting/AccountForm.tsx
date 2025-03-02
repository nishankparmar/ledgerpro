
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAccounts } from '@/hooks/useAccounts';
import {
  Account,
  AccountType,
  AccountClassification,
  CreateAccountPayload,
  UpdateAccountPayload,
  accountClassifications
} from '@/types/accounting';
import { useForm } from '@/hooks/useForm';
import { useToast } from '@/hooks/use-toast';
import AccountCodeField from './form-fields/AccountCodeField';
import AccountNameField from './form-fields/AccountNameField';
import AccountTypeField from './form-fields/AccountTypeField';
import AccountClassificationField from './form-fields/AccountClassificationField';
import AccountDescriptionField from './form-fields/AccountDescriptionField';
import AccountInitialBalanceField from './form-fields/AccountInitialBalanceField';
import AccountStatusField from './form-fields/AccountStatusField';
import { validateAccountForm } from './utils/accountFormValidator';

interface AccountFormProps {
  account: Account | null;
  isOpen: boolean;
  onClose: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({ account, isOpen, onClose }) => {
  const { createAccount, updateAccount } = useAccounts();
  const { toast } = useToast();
  const [availableClassifications, setAvailableClassifications] = useState<AccountClassification[]>([]);
  
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
        classification: 'current-asset' as AccountClassification, 
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
      if (!classifications.includes(values.classification as AccountClassification)) {
        setValues({ ...values, classification: classifications[0] });
      }
    }
  }, [values.type, setValues]);

  // Submit handler
  const onSubmit = async () => {
    try {
      const validationErrors = validateAccountForm(values, !!account);
      
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
          classification: values.classification as AccountClassification,
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
          classification: values.classification as AccountClassification,
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

  // Custom handler for textarea to match the type expectations
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange({
      target: {
        name: e.target.name,
        value: e.target.value
      }
    } as React.ChangeEvent<HTMLInputElement>);
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
            <AccountCodeField 
              value={values.code} 
              onChange={handleChange} 
              error={errors.code} 
            />
            
            {/* Account Name */}
            <AccountNameField 
              value={values.name} 
              onChange={handleChange} 
              error={errors.name} 
            />
            
            {/* Account Type */}
            <AccountTypeField 
              value={values.type as AccountType} 
              onValueChange={(value) => setValues({ ...values, type: value })} 
              error={errors.type} 
            />
            
            {/* Account Classification */}
            <AccountClassificationField 
              value={values.classification as AccountClassification} 
              onValueChange={(value) => setValues({ ...values, classification: value })} 
              availableClassifications={availableClassifications}
              error={errors.classification} 
            />
            
            {/* Description */}
            <AccountDescriptionField 
              value={values.description} 
              onChange={handleTextAreaChange} 
            />
            
            {/* Initial Balance - only for new accounts */}
            {!account && (
              <AccountInitialBalanceField 
                value={values.initialBalance} 
                onChange={handleChange} 
                error={errors.initialBalance} 
              />
            )}
            
            {/* Active Status */}
            <AccountStatusField 
              isActive={values.isActive} 
              onToggle={(checked) => setValues({ ...values, isActive: checked })} 
            />
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
