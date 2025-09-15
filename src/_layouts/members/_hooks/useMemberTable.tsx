"use client";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { useMemo, useCallback } from "react";
import React from "react";
import useTable from "@/_hooks/table/useTable";
import { GetMemberListResponseDto } from "../_dtos/getMemberListResponse.dto";
import { useLocale } from "@/_hooks/useLocale";
import Button from "@/_components/Button/Button";
import Badge from "@/_components/Badge/Badge";
import { useMemberDetailStore } from "../_store/useMemberDetailStore";
import { ContactType } from "../_dtos/customerResponse.dto";
import dayjs from "dayjs";
import { css } from "@emotion/react";
import Image from "next/image";
import { TableSort, SortDirection } from "@/_components/TableSort/TableSort";

interface UseMemberTableProps {
  memberList: GetMemberListResponseDto[];
  currentSort?: string;
  currentSortDirection?: SortDirection;
  onSort: (sortKey: string, direction: SortDirection) => void;
}

export const useMemberTable = ({ 
  memberList, 
  currentSort, 
  currentSortDirection, 
  onSort 
}: UseMemberTableProps) => {
  const columnHelper = createColumnHelper<GetMemberListResponseDto>();
  const { t, locale } = useLocale();
  const { setId } = useMemberDetailStore();

  const data = useMemo(() => {
    if (!memberList || memberList.length === 0) return [];
    return memberList;
  }, [memberList]);

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

  const getContactTypeDisplay = useCallback(
    (type: ContactType) => {
      const typeMap = {
        [ContactType.EMAIL]: t("member.contact.type.email"),
        [ContactType.PHONE]: t("member.contact.type.phone"),
      };
      return typeMap[type] || type;
    },
    [t]
  );


  const columns = useMemo(
    () =>
      [
        columnHelper.accessor("id", {
          header: "ID",
          size: 80,
          cell: ({ getValue }) => getValue(),
        }),
        columnHelper.display({
          header: () => (
            <TableSort
              sortKey="name"
              currentSort={currentSort}
              currentSortDirection={currentSortDirection}
              onSort={onSort}
            >
              {t("table.column.member")}
            </TableSort>
          ),
          size: 200,
          id: "member_info",
          cell: ({ row }) => (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {row.original.icon && (
                <Image
                  src={row.original.icon}
                  alt={row.original.name}
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              )}
              <div css={flexCss}>
                <Badge cssStyle={badgeCss} type="point">
                  {t("table.label.name")}
                </Badge>
                <span style={{ fontWeight: "600" }}>{row.original.name}</span>
              </div>
            </div>
          ),
        }),
        columnHelper.display({
          header: t("table.label.country"),
          size: 120,
          id: "country",
          cell: ({ row }) => (
            <div css={flexCss}>
              <Badge type="infoDefault">{row.original.country}</Badge>
            </div>
          ),
        }),
        columnHelper.display({
          header: t("table.column.contact"),
          size: 250,
          id: "contact_info",
          cell: ({ row }) => {
            const contacts = row.original.CustomerContact || [];
            const activeContacts = contacts.filter(
              (contact) => contact.isActive && !contact.isHidden
            );

            if (activeContacts.length === 0) {
              return (
                <div css={flexCss}>
                  <Badge type="infoDefault">{t("member.contact.none")}</Badge>
                </div>
              );
            }

            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {activeContacts.slice(0, 2).map((contact, index) => (
                  <div key={contact.id || index} css={flexCss}>
                    <Badge cssStyle={badgeCss} type={"point"}>
                      {getContactTypeDisplay(contact.type)}
                    </Badge>
                    <span
                      style={{
                        maxWidth: "180px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {contact.value}
                    </span>
                  </div>
                ))}
                {activeContacts.length > 2 && (
                  <div css={flexCss}>
                    <Badge type="infoDefault">
                      +{activeContacts.length - 2} more
                    </Badge>
                  </div>
                )}
              </div>
            );
          },
        }),
        columnHelper.accessor("createdAt", {
          header: () => (
            <TableSort
              sortKey="createdAt"
              currentSort={currentSort}
              currentSortDirection={currentSortDirection}
              onSort={onSort}
            >
              {t("table.column.datetime")}
            </TableSort>
          ),
          size: 150,
          cell: ({ getValue }) =>
            dayjs(getValue()).format("YYYY-MM-DD HH:mm:ss"),
        }),
        columnHelper.display({
          header: t("common.detail"),
          size: 80,
          id: "detail_button",
          cell: ({ row }) => (
            <Button
              type="button"
              buttonType="primary"
              onClick={() => setId(row.original.id.toString())}
            >
              {t("common.detail")}
            </Button>
          ),
        }),
      ] as ColumnDef<GetMemberListResponseDto>[],
    [
      columnHelper,
      t,
      setId,
      getContactTypeDisplay,
      badgeCss,
      flexCss,
      currentSort,
      currentSortDirection,
      onSort,
    ]
  );

  const { table } = useTable({
    data,
    columns,
  });

  return { table };
};
