
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchTransactions,
  fetchTransactionsByType,
  createTransaction,
  deleteTransaction,
  Transaction,
  CreateTransactionPayload
} from '@/services/transactionsService';
import { useToast } from '@/hooks/use-toast';

// Query key factory for better organization
export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  list: (filters: any) => [...transactionKeys.lists(), { filters }] as const,
  types: () => [...transactionKeys.all, 'types'] as const,
  type: (type: string) => [...transactionKeys.types(), type] as const,
  details: () => [...transactionKeys.all, 'detail'] as const,
  detail: (id: string) => [...transactionKeys.details(), id] as const,
};

// Hook for fetching all transactions
export const useTransactionsQuery = () => {
  return useQuery({
    queryKey: transactionKeys.lists(),
    queryFn: fetchTransactions,
  });
};

// Hook for fetching transactions by type
export const useTransactionsByTypeQuery = (type: string) => {
  return useQuery({
    queryKey: transactionKeys.type(type),
    queryFn: () => fetchTransactionsByType(type),
    enabled: !!type, // Only run the query if a type is provided
  });
};

// Hook for creating a new transaction
export const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (transactionData: CreateTransactionPayload) => createTransaction(transactionData),
    onSuccess: () => {
      // Invalidate transactions list to trigger a refetch
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: transactionKeys.types() });
      
      toast({
        title: 'Transaction Created',
        description: 'Transaction has been created successfully.',
      });
    },
    onError: (error) => {
      console.error('Error creating transaction:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create transaction. Please try again.',
        variant: 'destructive',
      });
    },
  });
};

// Hook for deleting a transaction
export const useDeleteTransactionMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: transactionKeys.types() });
      
      toast({
        title: 'Transaction Deleted',
        description: 'Transaction has been deleted successfully.',
      });
    },
    onError: (error) => {
      console.error('Error deleting transaction:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete transaction. Please try again.',
        variant: 'destructive',
      });
    },
  });
};
