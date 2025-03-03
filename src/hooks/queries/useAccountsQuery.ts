
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchAccounts, 
  fetchAccountById,
  createNewAccount,
  updateExistingAccount,
  deleteExistingAccount
} from '@/services/accountsService';
import { CreateAccountPayload, UpdateAccountPayload } from '@/types/accounting';
import { useToast } from '@/hooks/use-toast';

// Query key factory for better organization
export const accountKeys = {
  all: ['accounts'] as const,
  lists: () => [...accountKeys.all, 'list'] as const,
  list: (filters: any) => [...accountKeys.lists(), { filters }] as const,
  details: () => [...accountKeys.all, 'detail'] as const,
  detail: (id: string) => [...accountKeys.details(), id] as const,
};

// Hook for fetching all accounts
export const useAccountsQuery = () => {
  return useQuery({
    queryKey: accountKeys.lists(),
    queryFn: fetchAccounts,
  });
};

// Hook for fetching a single account by ID
export const useAccountByIdQuery = (id: string) => {
  return useQuery({
    queryKey: accountKeys.detail(id),
    queryFn: () => fetchAccountById(id),
    enabled: !!id, // Only run the query if an ID is provided
  });
};

// Hook for creating a new account
export const useCreateAccountMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (accountData: CreateAccountPayload) => createNewAccount(accountData),
    onSuccess: (newAccount) => {
      // Invalidate accounts list to trigger a refetch
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
      
      toast({
        title: 'Account Created',
        description: `${newAccount.name} account has been created successfully.`,
      });
    },
    onError: (error) => {
      console.error('Error creating account:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    },
  });
};

// Hook for updating an existing account
export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAccountPayload }) => 
      updateExistingAccount(id, data),
    onSuccess: (updatedAccount) => {
      // Invalidate specific account query and accounts list
      queryClient.invalidateQueries({ queryKey: accountKeys.detail(updatedAccount.id) });
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
      
      toast({
        title: 'Account Updated',
        description: 'Account has been updated successfully.',
      });
    },
    onError: (error) => {
      console.error('Error updating account:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update account. Please try again.',
        variant: 'destructive',
      });
    },
  });
};

// Hook for deleting an account
export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteExistingAccount(id),
    onSuccess: (_, id) => {
      // Invalidate and remove the account from the cache
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
      queryClient.removeQueries({ queryKey: accountKeys.detail(id) });
      
      toast({
        title: 'Account Deleted',
        description: 'Account has been deleted successfully.',
      });
    },
    onError: (error) => {
      console.error('Error deleting account:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete account. Please try again.',
        variant: 'destructive',
      });
    },
  });
};
