"use client";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { useMemo, useCallback } from "react";
import React from "react";
import useTable from "@/_hooks/table/useTable";
import { InvoiceItemDto } from "../_dtos/getInvoiceListResponse.dto";
import { useLocale } from "@/_hooks/useLocale";
import Button from "@/_components/Button/Button";
import Badge from "@/_components/Badge/Badge";
import { useInvoiceDetailStore } from "../_store/useInvoiceDetailStore";
import { formatCurrency } from "@/_utils/formatters";
import dayjs from "dayjs";
import { css } from "@emotion/react";

interface UseInvoiceTableProps {
  invoiceList: InvoiceItemDto[];
}

export const useInvoiceTable = ({ invoiceList }: UseInvoiceTableProps) => {
  const columnHelper = createColumnHelper<InvoiceItemDto>();
  const { t, locale } = useLocale();
  const { setId } = useInvoiceDetailStore();

  const data = useMemo(() => {
    if (!invoiceList || invoiceList.length === 0) return [];
    return invoiceList;
  }, [invoiceList]);

  const flexCss = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    word-break: break-all;
    gap: 4px;
    flex-wrap: wrap;
  `;

  const badgeCss = css`
    width: ${locale === "en" ? "75px" : "60px"};
  `;

  const getStateDisplay = useCallback(
    (state: string) => {
      const stateMap = {
        pending: t("invoice.state.pending"),
        completed: t("invoice.state.completed"),
        failed: t("invoice.state.failed"),
        cancelled: t("invoice.state.cancelled"),
      };
      return stateMap[state as keyof typeof stateMap] || state;
    },
    [t]
  );

  const getStateBadgeType = useCallback((state: string) => {
    switch (state) {
      case "completed":
        return "infoSuccess";
      case "pending":
        return "infoWarning";
      case "failed":
        return "infoDanger";
      case "cancelled":
        return "infoDefault";
      default:
        return "infoDefault";
    }
  }, []);

  const columns = useMemo(
    () =>
      [
        columnHelper.accessor("id", {
          header: "ID",
          size: 100,
          cell: ({ row }) => row.original.id,
        }),
        columnHelper.display({
          header: t("table.column.customer"),
          size: 140,
          id: "customer",
          cell: ({ row }) => (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div css={flexCss}>
                <Badge cssStyle={badgeCss} type="point">
                  {t("table.label.customer")}
                </Badge>
                {row.original.customer.idCode}
              </div>
              <div css={flexCss}>
                <Badge cssStyle={badgeCss} type="infoDefault">
                  ID
                </Badge>
                {row.original.customer.id}
              </div>
            </div>
          ),
        }),
        columnHelper.accessor("title", {
          header: t("invoice.title"),
          size: 200,
          cell: ({ getValue }) => getValue(),
        }),
        columnHelper.accessor("stdPrice", {
          header: t("invoice.stdPrice"),
          size: 150,
          cell: ({ getValue }) => formatCurrency(getValue()),
        }),
        columnHelper.accessor("cashAmount", {
          header: t("invoice.cashAmount"),
          size: 150,
          cell: ({ getValue }) => formatCurrency(getValue()),
        }),
        columnHelper.accessor("cryptoAmount", {
          header: t("invoice.cryptoAmount"),
          size: 150,
          cell: ({ getValue }) => getValue(),
        }),
        columnHelper.accessor("detail", {
          header: t("invoice.detail"),
          size: 200,
          cell: ({ getValue }) => (
            <span
              style={{
                maxWidth: "180px",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {getValue()}
            </span>
          ),
        }),
        columnHelper.accessor("state", {
          header: t("table.column.status"),
          size: 120,
          cell: ({ getValue }) => (
            <Badge type={getStateBadgeType(getValue())}>
              {getStateDisplay(getValue())}
            </Badge>
          ),
        }),
        columnHelper.accessor("createdAt", {
          header: t("table.column.datetime"),
          size: 150,
          cell: (row) => dayjs(row.getValue()).format("YYYY-MM-DD HH:mm:ss"),
        }),
        columnHelper.display({
          header: t("common.detail"),
          size: 80,
          id: "detail_button",
          cell: ({ row }) => (
            <Button
              type="button"
              buttonType="primary"
              onClick={() => setId(row.original.id)}
            >
              {t("common.detail")}
            </Button>
          ),
        }),
      ] as ColumnDef<InvoiceItemDto>[],
    [
      columnHelper,
      t,
      setId,
      getStateDisplay,
      getStateBadgeType,
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
