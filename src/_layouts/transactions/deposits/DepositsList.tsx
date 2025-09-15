"use client";

import React from "react";
import TextInput from "@/_components/TextInput/TextInput";
import Button from "@/_components/Button/Button";
import DatePicker from "@/_components/DatePicker/DatePicker";
import { DepositsPageCss } from "./_styles/DepositsPage.styles";
import { useTransactionListQuery } from "../_shared/_hooks/react-query/useTransactionListQuery";
import { useLocale } from "@/_hooks/useLocale";
import { useFilter } from "@/_hooks/useFilter";
import { useDepositsTable } from "./_hooks/useDepositsTable";
import AppTable from "@/_components/Table/Table";
import TableWrapper from "@/_components/TableWrapper/TableWrapper";
import Loader from "@/_components/Loader/Loader";
import Pagination from "@/_components/Pagination/Pagination";

const DepositsList = () => {
  const { t } = useLocale();
  const {
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    resetFilter,
    customerId,
    handleSearchChange,
  } = useFilter();

  const { data: transactionData, isLoading } = useTransactionListQuery();
  const { table } = useDepositsTable({
    depositsList: transactionData?.list || [],
  });

  return (
    <section css={DepositsPageCss.container}>
      <div css={DepositsPageCss.filtersSection}>
        <div css={DepositsPageCss.filterRow}>
          <TextInput
            placeholder={t("filter.customerId.placeholder")}
            value={customerId}
            onChange={(e) => handleSearchChange(e.target.value)}
            cssStyle={DepositsPageCss.input}
          />

          <div css={DepositsPageCss.inputSection}>
            <DatePicker
              selected={startDate ? new Date(startDate) : null}
              onChange={handleStartDateChange}
              placeholderText={t("filter.startDate.placeholder")}
              cssStyle={DepositsPageCss.input}
            />
          </div>

          <div css={DepositsPageCss.inputSection}>
            <DatePicker
              selected={endDate ? new Date(endDate) : null}
              onChange={handleEndDateChange}
              placeholderText={t("filter.endDate.placeholder")}
              cssStyle={DepositsPageCss.input}
            />
          </div>

          <Button
            type="button"
            buttonType="grayLine"
            onClick={resetFilter}
            cssStyle={DepositsPageCss.resetButton}
          >
            {t("common.reset")}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <TableWrapper>
          <AppTable table={table} />
          <Pagination total={transactionData?.total || 0} />
        </TableWrapper>
      )}
    </section>
  );
};

export default DepositsList;
