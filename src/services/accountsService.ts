
import { supabase } from '@/lib/supabase';
import { Account, CreateAccountPayload, UpdateAccountPayload } from '@/types/accounting';

// Transform Supabase response to our Account type
const transformAccount = (account: any): Account => ({
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
});

// Fetch all accounts
export const fetchAccounts = async (): Promise<Account[]> => {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .order('code', { ascending: true });
  
  if (error) {
    throw error;
  }
  
  return data.map(transformAccount);
};

// Get account by ID
export const fetchAccountById = async (id: string): Promise<Account | null> => {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  
  if (error) {
    throw error;
  }
  
  return data ? transformAccount(data) : null;
};

// Create a new account
export const createNewAccount = async (accountData: CreateAccountPayload): Promise<Account> => {
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
  
  return transformAccount(data);
};

// Update an existing account
export const updateExistingAccount = async (id: string, accountData: UpdateAccountPayload): Promise<Account> => {
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
  
  return transformAccount(data);
};

// Delete an account
export const deleteExistingAccount = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('accounts')
    .delete()
    .eq('id', id);
  
  if (error) {
    throw error;
  }
};
