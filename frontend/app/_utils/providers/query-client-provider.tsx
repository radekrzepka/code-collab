"use client";

import type { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "react-query";

interface QueryClientProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  return (
    <QueryClientProviderBase client={queryClient}>
      {children}
    </QueryClientProviderBase>
  );
};
