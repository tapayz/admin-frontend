"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePagination } from "@/_hooks/usePagination";
import { paginationCss } from "./Pagination.styles";
import { useLocale } from "@/_hooks/useLocale";

interface PaginationProps {
  total: number;
  pageLimit?: number;
}

const Pagination = ({ total, pageLimit = 50 }: PaginationProps) => {
  const {
    currentPage,
    handleFirstGroup,
    handlePrevGroup,
    handleNextGroup,
    handleLastGroup,
    totalPages,
    handlePageChange,
    inputPage,
    handleInputPageChange,
  } = usePagination(total, pageLimit);

  const { t } = useLocale();

  return (
    <div css={paginationCss.container}>
      <div css={paginationCss.buttonGroup}>
        <button
          onClick={handleFirstGroup}
          disabled={currentPage === 0}
          css={[
            paginationCss.button,
            currentPage === 0 && paginationCss.disabled,
            paginationCss.borderRight,
          ]}
        >
          <ChevronsLeft
            stroke={`${currentPage === 0 ? "#d1d5db" : "#434343"}`}
            size={16}
          />
          <span>{t("pagination.first")}</span>
        </button>
        <button
          onClick={handlePrevGroup}
          css={[
            paginationCss.button,
            currentPage === 0 && paginationCss.disabled,
            paginationCss.borderRight,
          ]}
          disabled={currentPage === 0}
        >
          <ChevronLeft
            stroke={`${currentPage === 0 ? "#d1d5db" : "#434343"}`}
            size={16}
          />
          <span>{t("pagination.prev")}</span>
        </button>
        <input
          onKeyDown={(e) =>
            e.key === "Enter" && handlePageChange(Number(inputPage))
          }
          css={[paginationCss.input, paginationCss.borderRight]}
          value={inputPage ?? currentPage + 1}
          onChange={(e) => handleInputPageChange(e)}
        />
        <button
          onClick={handleNextGroup}
          css={[
            paginationCss.button,
            paginationCss.borderRight,
            currentPage >= totalPages - 1 && paginationCss.disabled,
          ]}
          disabled={currentPage >= totalPages - 1}
        >
          <span>{t("pagination.next")}</span>
          <ChevronRight
            stroke={`${currentPage >= totalPages - 1 ? "#d1d5db" : "#434343"}`}
            size={16}
          />
        </button>
        <button
          onClick={handleLastGroup}
          css={[
            paginationCss.button,
            currentPage >= totalPages - 1 && paginationCss.disabled,
          ]}
          disabled={currentPage >= totalPages - 1}
        >
          <span>{t("pagination.last")}</span>
          <ChevronsRight
            stroke={`${currentPage >= totalPages - 1 ? "#d1d5db" : "#434343"}`}
            size={16}
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
