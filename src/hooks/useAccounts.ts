
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Account, CreateAccountPayload, UpdateAccountPayload } from '@/types/accounting';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch all accounts
  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // For now, we're simulating data - this will be replaced with Supabase 
      // query once we've created the tables
      
      // Placeholder for actual implementation
      console.log('Fetching accounts...');
      
      // Dummy data for now - this will be replaced with Supabase query
      const dummyAccounts: Account[] = [
        {
          id: '1',
          code: '1001',
          name: 'Cash',
          type: 'asset',
          classification: 'current-asset',
          description: 'Cash on hand',
          balance: 50000,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          code: '1002',
          name: 'Bank Account',
          type: 'asset',
          classification: 'current-asset',
          description: 'Primary bank account',
          balance: 1500000,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          code: '2001',
          name: 'Accounts Payable',
          type: 'liability',
          classification: 'current-liability',
          description: 'Money owed to suppliers',
          balance: 75000,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      
      setAccounts(dummyAccounts);
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError('Failed to fetch accounts. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to load accounts. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Create a new account
  const createAccount = useCallback(async (accountData: CreateAccountPayload) => {
    try {
      // For now we're simulating - this will be replaced with Supabase insertion
      console.log('Creating account with data:', accountData);
      
      const newAccount: Account = {
        id: Date.now().toString(), // This would be a UUID in production
        ...accountData,
        balance: accountData.initialBalance || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setAccounts(prev => [...prev, newAccount]);
      
      toast({
        title: 'Account Created',
        description: `${accountData.name} account has been created successfully.`,
      });
      
      return newAccount;
    } catch (err) {
      console.error('Error creating account:', err);
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
      throw err;
    }
  }, [toast]);

  // Update an existing account
  const updateAccount = useCallback(async (id: string, accountData: UpdateAccountPayload) => {
    try {
      // For now we're simulating - this will be replaced with Supabase update
      console.log('Updating account:', id, accountData);
      
      setAccounts(prev => prev.map(account => 
        account.id === id 
          ? { 
              ...account, 
              ...accountData, 
              updatedAt: new Date().toISOString() 
            } 
          : account
      ));
      
      toast({
        title: 'Account Updated',
        description: 'Account has been updated successfully.',
      });
    } catch (err) {
      console.error('Error updating account:', err);
      toast({
        title: 'Error',
        description: 'Failed to update account. Please try again.',
        variant: 'destructive',
      });
      throw err;
    }
  }, [toast]);

  // Delete an account (or mark as inactive)
  const deleteAccount = useCallback(async (id: string) => {
    try {
      // For now we're simulating - this will be replaced with Supabase deletion
      console.log('Deleting account:', id);
      
      // In a real app, we might just mark it as inactive rather than physically delete
      setAccounts(prev => prev.filter(account => account.id !== id));
      
      toast({
        title: 'Account Deleted',
        description: 'Account has been deleted successfully.',
      });
    } catch (err) {
      console.error('Error deleting account:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete account. Please try again.',
        variant: 'destructive',
      });
      throw err;
    }
  }, [toast]);

  // Get an account by ID
  const getAccountById = useCallback((id: string) => {
    return accounts.find(account => account.id === id) || null;
  }, [accounts]);

  // Get accounts by type
  const getAccountsByType = useCallback((type: string) => {
    return accounts.filter(account => account.type === type);
  }, [accounts]);

  // Load accounts on component mount
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    getAccountById,
    getAccountsByType,
  };
};
