
import { useMemo } from 'react';
import { 
  useAccountsQuery,
  useAccountByIdQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
  useDeleteAccountMutation 
} from './queries/useAccountsQuery';
import { Account, AccountType, CreateAccountPayload, UpdateAccountPayload } from '@/types/accounting';

export const useAccounts = () => {
  // Fetch all accounts
  const { 
    data: accounts = [], 
    isLoading: loading, 
    error: queryError 
  } = useAccountsQuery();
  
  // Set up mutations
  const { mutateAsync: createAccount } = useCreateAccountMutation();
  const { mutateAsync: updateAccount } = useUpdateAccountMutation();
  const { mutateAsync: deleteAccount } = useDeleteAccountMutation();
  
  // Handle error message
  const error = queryError ? (queryError instanceof Error ? queryError.message : 'Failed to fetch accounts') : null;

  // Define utility methods
  const getAccountById = useMemo(() => {
    return (id: string) => accounts.find(account => account.id === id) || null;
  }, [accounts]);

  const getAccountsByType = useMemo(() => {
    return (type: string) => accounts.filter(account => account.type === type);
  }, [accounts]);

  // Public API
  return {
    accounts,
    loading,
    error,
    fetchAccounts: async () => {
      // This will refetch accounts using the query client
      // No implementation needed as React Query handles refetching
    },
    createAccount: async (accountData: CreateAccountPayload): Promise<Account> => {
      return await createAccount(accountData);
    },
    updateAccount: async (id: string, accountData: UpdateAccountPayload): Promise<Account> => {
      return await updateAccount({ id, data: accountData });
    },
    deleteAccount: async (id: string): Promise<void> => {
      await deleteAccount(id);
    },
    getAccountById,
    getAccountsByType,
  };
};
