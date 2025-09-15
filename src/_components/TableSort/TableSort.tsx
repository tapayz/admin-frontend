"use client";

import React from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { css } from "@emotion/react";
import { sortButtonCss } from "./TableSort.styles";

export type SortDirection = "desc" | "asc" | null;

interface TableSortProps {
  children: React.ReactNode;
  sortKey: string;
  currentSort?: string;
  currentSortDirection?: SortDirection;
  onSort: (sortKey: string, direction: SortDirection) => void;
}

export const TableSort: React.FC<TableSortProps> = ({
  children,
  sortKey,
  currentSort,
  currentSortDirection,
  onSort,
}) => {
  const handleClick = () => {
    if (currentSort !== sortKey) {
      // 다른 컬럼이 선택된 경우 desc부터 시작
      onSort(sortKey, "desc");
    } else {
      // 같은 컬럼 클릭 시 순환: desc -> asc -> null
      if (currentSortDirection === "desc") {
        onSort(sortKey, "asc");
      } else if (currentSortDirection === "asc") {
        onSort(sortKey, null);
      } else {
        onSort(sortKey, "desc");
      }
    }
  };

  const getSortIcon = () => {
    if (currentSort !== sortKey || !currentSortDirection) {
      return <ChevronsUpDown css={sortButtonCss.icon} color="#9CA3AF" />;
    }

    if (currentSortDirection === "desc") {
      return <ChevronDown css={sortButtonCss.icon} color="#5A3A9A" />;
    } else {
      return <ChevronUp css={sortButtonCss.icon} color="#5A3A9A" />;
    }
  };

  return (
    <div css={sortButtonCss.button} onClick={handleClick}>
      <span>{children}</span>
      {getSortIcon()}
    </div>
  );
};
