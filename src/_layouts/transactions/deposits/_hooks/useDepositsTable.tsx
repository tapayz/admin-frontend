"use client";

import { useTransactionTable } from "../../_shared/_hooks/useTransactionTable";
import { TransactionItemDto } from "../../_shared/_dtos/getTransactionListResponse.dto";

interface UseDepositsTableProps {
  depositsList: TransactionItemDto[];
}

export const useDepositsTable = ({ depositsList }: UseDepositsTableProps) => {
  return useTransactionTable({ transactionList: depositsList });
};