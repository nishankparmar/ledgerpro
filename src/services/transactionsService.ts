
import { supabase } from '@/lib/supabase';

export interface TransactionEntry {
  id?: string;
  transactionId: string;
  accountId: string;
  description: string;
  debit: number;
  credit: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: string;
  reference: string;
  description: string;
  entries: TransactionEntry[];
  createdAt: string;
  updatedAt: string;
}

export type CreateTransactionPayload = Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'> & {
  entries: Omit<TransactionEntry, 'id' | 'transactionId'>[];
};

// Transform Supabase response to our Transaction type
const transformTransaction = async (transaction: any): Promise<Transaction> => {
  // Fetch the entries for this transaction
  const { data: entriesData, error: entriesError } = await supabase
    .from('transaction_entries')
    .select('*')
    .eq('transaction_id', transaction.id);
    
  if (entriesError) {
    console.error('Error fetching transaction entries:', entriesError);
    throw entriesError;
  }
  
  const entries = entriesData.map(entry => ({
    id: entry.id,
    transactionId: entry.transaction_id,
    accountId: entry.account_id,
    description: entry.description || '',
    debit: entry.debit || 0,
    credit: entry.credit || 0
  }));
  
  return {
    id: transaction.id,
    date: transaction.date,
    type: transaction.type,
    reference: transaction.reference || '',
    description: transaction.description || '',
    entries: entries,
    createdAt: transaction.created_at,
    updatedAt: transaction.updated_at
  };
};

// Fetch all transactions
export const fetchTransactions = async (): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) {
    throw error;
  }
  
  // Transform each transaction
  const promises = data.map(transformTransaction);
  return Promise.all(promises);
};

// Fetch transactions of a specific type
export const fetchTransactionsByType = async (type: string): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('type', type)
    .order('date', { ascending: false });
  
  if (error) {
    throw error;
  }
  
  // Transform each transaction
  const promises = data.map(transformTransaction);
  return Promise.all(promises);
};

// Create a new transaction with its entries
export const createTransaction = async (transactionData: CreateTransactionPayload): Promise<Transaction> => {
  // Start a transaction
  const { data: transactionRecord, error: transactionError } = await supabase
    .from('transactions')
    .insert([{
      date: transactionData.date,
      type: transactionData.type,
      reference: transactionData.reference,
      description: transactionData.description
    }])
    .select()
    .single();
  
  if (transactionError) {
    throw transactionError;
  }
  
  // Create entries
  const entries = transactionData.entries.map(entry => ({
    transaction_id: transactionRecord.id,
    account_id: entry.accountId,
    description: entry.description,
    debit: entry.debit,
    credit: entry.credit
  }));
  
  const { data: entriesData, error: entriesError } = await supabase
    .from('transaction_entries')
    .insert(entries)
    .select();
  
  if (entriesError) {
    // If entries creation fails, we should ideally roll back the transaction
    // Since Supabase doesn't support true SQL transactions directly, we should
    // manually delete the transaction
    await supabase.from('transactions').delete().eq('id', transactionRecord.id);
    throw entriesError;
  }
  
  // Update account balances
  for (const entry of transactionData.entries) {
    if (entry.debit > 0) {
      // For asset and expense accounts, debits increase the balance
      // For liability, equity, and revenue accounts, debits decrease the balance
      const { data: accountData } = await supabase
        .from('accounts')
        .select('type')
        .eq('id', entry.accountId)
        .single();
        
      if (accountData) {
        const balanceChange = ['asset', 'expense'].includes(accountData.type) 
          ? entry.debit 
          : -entry.debit;
          
        await supabase.rpc('update_account_balance', {
          p_account_id: entry.accountId,
          p_amount: balanceChange
        });
      }
    }
    
    if (entry.credit > 0) {
      // For liability, equity, and revenue accounts, credits increase the balance
      // For asset and expense accounts, credits decrease the balance
      const { data: accountData } = await supabase
        .from('accounts')
        .select('type')
        .eq('id', entry.accountId)
        .single();
        
      if (accountData) {
        const balanceChange = ['liability', 'equity', 'income'].includes(accountData.type) 
          ? entry.credit 
          : -entry.credit;
          
        await supabase.rpc('update_account_balance', {
          p_account_id: entry.accountId,
          p_amount: balanceChange
        });
      }
    }
  }
  
  return transformTransaction(transactionRecord);
};

// Delete a transaction
export const deleteTransaction = async (id: string): Promise<void> => {
  // First, get the transaction entries to update account balances
  const { data: entries, error: entriesError } = await supabase
    .from('transaction_entries')
    .select('*')
    .eq('transaction_id', id);
    
  if (entriesError) {
    throw entriesError;
  }
  
  // Reverse the account balance updates
  for (const entry of entries) {
    if (entry.debit > 0) {
      const { data: accountData } = await supabase
        .from('accounts')
        .select('type')
        .eq('id', entry.account_id)
        .single();
        
      if (accountData) {
        const balanceChange = ['asset', 'expense'].includes(accountData.type) 
          ? -entry.debit 
          : entry.debit;
          
        await supabase.rpc('update_account_balance', {
          p_account_id: entry.account_id,
          p_amount: balanceChange
        });
      }
    }
    
    if (entry.credit > 0) {
      const { data: accountData } = await supabase
        .from('accounts')
        .select('type')
        .eq('id', entry.account_id)
        .single();
        
      if (accountData) {
        const balanceChange = ['liability', 'equity', 'income'].includes(accountData.type) 
          ? -entry.credit 
          : entry.credit;
          
        await supabase.rpc('update_account_balance', {
          p_account_id: entry.account_id,
          p_amount: balanceChange
        });
      }
    }
  }
  
  // Delete entries first (due to foreign key constraints)
  const { error: deleteEntriesError } = await supabase
    .from('transaction_entries')
    .delete()
    .eq('transaction_id', id);
    
  if (deleteEntriesError) {
    throw deleteEntriesError;
  }
  
  // Then delete the transaction
  const { error: deleteTransactionError } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);
    
  if (deleteTransactionError) {
    throw deleteTransactionError;
  }
};
