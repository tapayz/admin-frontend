import { QueryClient } from '@tanstack/react-query'

let browserQueryClient: QueryClient | undefined = undefined

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: (failureCount: number, error: unknown) => {
          if (failureCount > 2) {
            return false;
          }
          return (error as any)?.cause?.status === 401;
        },
        staleTime: 60 * 1000, // 1 minute
      },
      mutations: {
        retry: (failureCount: number, error: unknown) => {
          if (failureCount > 2) {
            return false;
          }
          return failureCount <= 2 && (error as any)?.cause?.status === 401;
        },
      },
    },
  })
}

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}