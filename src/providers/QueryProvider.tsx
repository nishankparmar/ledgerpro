
import { QueryClient } from '@tanstack/react-query';

// Create a query client with default configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
