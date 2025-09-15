"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
};

function QueryProvider({ children, ...props }: Props) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider {...props} client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default QueryProvider;
