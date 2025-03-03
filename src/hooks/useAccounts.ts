
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
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .order('code', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      // Transform the data to match our Account type
      const transformedAccounts: Account[] = data.map(account => ({
        id: account.id,
        code: account.code,
        name: account.name,
        type: account.type as Account['type'],
        classification: account.classification as Account['classification'],
        description: account.description || '',
        balance: account.balance,
        isActive: account.is_active,
        createdAt: account.created_at,
        updatedAt: account.updated_at
      }));
      
      setAccounts(transformedAccounts);
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
      const { data, error } = await supabase
        .from('accounts')
        .insert([{
          code: accountData.code,
          name: accountData.name,
          type: accountData.type,
          classification: accountData.classification,
          description: accountData.description || '',
          balance: accountData.initialBalance || 0,
          is_active: accountData.isActive
        }])
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      // Transform the returned data to match our Account type
      const newAccount: Account = {
        id: data.id,
        code: data.code,
        name: data.name,
        type: data.type as Account['type'],
        classification: data.classification as Account['classification'],
        description: data.description || '',
        balance: data.balance,
        isActive: data.is_active,
        createdAt: data.created_at,
        updatedAt: data.updated_at
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
        description: err instanceof Error ? err.message : 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
      throw err;
    }
  }, [toast]);

  // Update an existing account
  const updateAccount = useCallback(async (id: string, accountData: UpdateAccountPayload) => {
    try {
      // Convert camelCase to snake_case for the Supabase API
      const updateData: Record<string, any> = {};
      if (accountData.code) updateData.code = accountData.code;
      if (accountData.name) updateData.name = accountData.name;
      if (accountData.type) updateData.type = accountData.type;
      if (accountData.classification) updateData.classification = accountData.classification;
      if (accountData.description !== undefined) updateData.description = accountData.description;
      if (accountData.balance !== undefined) updateData.balance = accountData.balance;
      if (accountData.isActive !== undefined) updateData.is_active = accountData.isActive;
      
      const { data, error } = await supabase
        .from('accounts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      // Transform the returned data to match our Account type
      const updatedAccount: Account = {
        id: data.id,
        code: data.code,
        name: data.name,
        type: data.type as Account['type'],
        classification: data.classification as Account['classification'],
        description: data.description || '',
        balance: data.balance,
        isActive: data.is_active,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
      
      setAccounts(prev => 
        prev.map(account => account.id === id ? updatedAccount : account)
      );
      
      toast({
        title: 'Account Updated',
        description: 'Account has been updated successfully.',
      });
      
      return updatedAccount;
    } catch (err) {
      console.error('Error updating account:', err);
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to update account. Please try again.',
        variant: 'destructive',
      });
      throw err;
    }
  }, [toast]);

  // Delete an account
  const deleteAccount = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('accounts')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setAccounts(prev => prev.filter(account => account.id !== id));
      
      toast({
        title: 'Account Deleted',
        description: 'Account has been deleted successfully.',
      });
    } catch (err) {
      console.error('Error deleting account:', err);
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to delete account. Please try again.',
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
