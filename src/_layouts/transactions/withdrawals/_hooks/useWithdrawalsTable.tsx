"use client";

import { useTransactionTable } from "../../_shared/_hooks/useTransactionTable";
import { TransactionItemDto } from "../../_shared/_dtos/getTransactionListResponse.dto";

interface UseWithdrawalsTableProps {
  withdrawalsList: TransactionItemDto[];
}

export const useWithdrawalsTable = ({ withdrawalsList }: UseWithdrawalsTableProps) => {
  return useTransactionTable({ transactionList: withdrawalsList });
};