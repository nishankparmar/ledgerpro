
import { 
  useTransactionsQuery,
  useTransactionsByTypeQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation 
} from './queries/useTransactionsQuery';
import { CreateTransactionPayload } from '@/services/transactionsService';

export const useTransactions = () => {
  // Fetch all transactions
  const { 
    data: transactions = [], 
    isLoading: loading, 
    error: queryError,
    refetch: refetchTransactions 
  } = useTransactionsQuery();
  
  // Set up mutations
  const { mutateAsync: createTransaction } = useCreateTransactionMutation();
  const { mutateAsync: deleteTransaction } = useDeleteTransactionMutation();
  
  // Handle error message
  const error = queryError ? (queryError instanceof Error ? queryError.message : 'Failed to fetch transactions') : null;

  // Public API
  return {
    transactions,
    loading,
    error,
    refetchTransactions,
    createTransaction: async (data: CreateTransactionPayload) => {
      return await createTransaction(data);
    },
    deleteTransaction: async (id: string) => {
      await deleteTransaction(id);
    }
  };
};

export const useTransactionsByType = (type: string) => {
  const { 
    data: transactions = [], 
    isLoading: loading, 
    error: queryError,
    refetch: refetchTransactions 
  } = useTransactionsByTypeQuery(type);
  
  // Handle error message
  const error = queryError ? (queryError instanceof Error ? queryError.message : `Failed to fetch ${type} transactions`) : null;

  return {
    transactions,
    loading,
    error,
    refetchTransactions
  };
};
