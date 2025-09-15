import { z } from "zod";

export const transactionFiltersSchema = z.object({
  size: z.number().min(1).max(100).optional(),
  page: z.number().min(0).optional(),
  startAt: z.date().optional(),
  endAt: z.date().optional(),
  customerId: z.number().optional(),
  type: z.enum(['WITHDRAW', 'DEPOSIT', 'INVOICE_DEPOSIT']).optional(),
});

export type TransactionFiltersSchema = z.infer<typeof transactionFiltersSchema>;