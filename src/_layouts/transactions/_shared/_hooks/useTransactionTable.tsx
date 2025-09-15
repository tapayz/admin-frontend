"use client";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { useMemo, useCallback } from "react";
import React from "react";
import useTable from "@/_hooks/table/useTable";
import { TransactionItemDto } from "../_dtos/getTransactionListResponse.dto";
import { useLocale } from "@/_hooks/useLocale";
import { formatCurrency } from "@/_utils/formatters";
import Badge from "@/_components/Badge/Badge";
import dayjs from "dayjs";
import { css } from "@emotion/react";

interface UseTransactionTableProps {
  transactionList: TransactionItemDto[];
}

export const useTransactionTable = ({
  transactionList,
}: UseTransactionTableProps) => {
  const columnHelper = createColumnHelper<TransactionItemDto>();
  const { t, locale } = useLocale();

  const data = useMemo(() => {
    if (!transactionList || transactionList.length === 0) return [];
    return transactionList;
  }, [transactionList]);

  const flexCss = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    word-break: break-all;

    gap: 4px;
    flex-wrap: wrap;
  `;

  const badgeCss = css`
    width: "75px";
  `;

  const getStateDisplay = useCallback(
    (state: string) => {
      const stateMap = {
        Ready: t("transaction.state.ready"),
        Pending: t("transaction.state.pending"),
        Complete: t("transaction.state.completed"),
        Failed: t("transaction.state.failed"),
      };
      return stateMap[state as keyof typeof stateMap] || state;
    },
    [t]
  );

  const getStateBadgeType = useCallback((state: string) => {
    switch (state) {
      case "Complete":
        return "infoSuccess";
      case "Pending":
        return "infoWarning";
      case "Failed":
        return "infoDanger";
      default:
        return "infoDefault";
    }
  }, []);

  const getTypeDisplay = useCallback(
    (type: string) => {
      return type === "DEPOSIT"
        ? t("transaction.type.deposit")
        : t("transaction.type.withdraw");
    },
    [t]
  );

  const getTypeBadgeType = useCallback((type: string) => {
    switch (type) {
      case "DEPOSIT":
        return "infoSuccess";
      case "WITHDRAW":
        return "infoDanger";
      default:
        return "infoDefault";
    }
  }, []);

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor("id", {
          header: t("transaction.table.id"),
          size: 80,
          cell: ({ row }) => row.original.id,
        }),
        columnHelper.display({
          header: t("transaction.table.user"),
          size: 120,
          id: "user",
          cell: ({ row }) => (
            <div css={flexCss}>{row.original.customer?.name || "-"}</div>
          ),
        }),
        columnHelper.display({
          header: t("transaction.table.amounts"),
          size: 150,
          id: "amounts",
          cell: ({ row }) => (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div css={flexCss}>
                <Badge cssStyle={badgeCss} type="success">
                  {t("transaction.table.cryptoAmount")}
                </Badge>
                {formatCurrency(row.original.invoice?.cryptoAmount || 0)}
              </div>
              <div css={flexCss}>
                <Badge cssStyle={badgeCss} type="infoSuccess">
                  {t("transaction.table.cashAmount")}
                </Badge>
                {formatCurrency(row.original.invoice?.cashAmount || 0)}
              </div>
            </div>
          ),
        }),
        columnHelper.display({
          header: t("transaction.table.crypto"),
          size: 100,
          id: "crypto",
          cell: ({ row }) => (
            <div css={flexCss}>
              <Badge cssStyle={badgeCss} type="default">
                {row.original.Asset?.symbol || "-"}
              </Badge>
            </div>
          ),
        }),
        columnHelper.accessor("from", {
          header: t("transaction.table.fromAddress"),
          size: 200,
          cell: ({ getValue }) => (
            <div css={flexCss}>
              <span style={{ fontSize: "12px", wordBreak: "break-all" }}>
                {getValue()}
              </span>
            </div>
          ),
        }),
        columnHelper.accessor("to", {
          header: t("transaction.table.toAddress"),
          size: 200,
          cell: ({ getValue }) => (
            <div css={flexCss}>
              <span style={{ fontSize: "12px", wordBreak: "break-all" }}>
                {getValue()}
              </span>
            </div>
          ),
        }),
        columnHelper.accessor("detail", {
          header: t("transaction.table.hash"),
          size: 180,
          cell: ({ getValue }) => (
            <div css={flexCss}>
              <span style={{ fontSize: "12px", wordBreak: "break-all" }}>
                {getValue()}
              </span>
            </div>
          ),
        }),
        columnHelper.accessor("state", {
          header: t("transaction.table.status"),
          size: 130,
          cell: ({ getValue }) => (
            <Badge type={getStateBadgeType(getValue())}>
              {getStateDisplay(getValue())}
            </Badge>
          ),
        }),
        columnHelper.accessor("type", {
          header: t("transaction.table.type"),
          size: 130,
          cell: ({ getValue }) => (
            <Badge type={getTypeBadgeType(getValue())}>
              {getTypeDisplay(getValue())}
            </Badge>
          ),
        }),
        columnHelper.accessor("createdAt", {
          header: t("transaction.table.datetime"),
          size: 150,
          cell: (row) => dayjs(row.getValue()).format("YYYY-MM-DD HH:mm:ss"),
        }),
      ] as ColumnDef<TransactionItemDto>[],
    [
      columnHelper,
      t,
      getStateDisplay,
      getStateBadgeType,
      getTypeBadgeType,
      getTypeDisplay,
      badgeCss,
      flexCss,
    ]
  );

  const { table } = useTable({
    data,
    columns,
  });

  return { table };
};
