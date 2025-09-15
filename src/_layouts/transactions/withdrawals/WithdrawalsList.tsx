"use client";

import React from "react";
import TextInput from "@/_components/TextInput/TextInput";
import Button from "@/_components/Button/Button";
import DatePicker from "@/_components/DatePicker/DatePicker";
import { WithdrawalsPageCss } from "./_styles/WithdrawalsPage.styles";
import { useTransactionListQuery } from "../_shared/_hooks/react-query/useTransactionListQuery";
import { useLocale } from "@/_hooks/useLocale";
import { useFilter } from "@/_hooks/useFilter";
import { useWithdrawalsTable } from "./_hooks/useWithdrawalsTable";
import AppTable from "@/_components/Table/Table";
import TableWrapper from "@/_components/TableWrapper/TableWrapper";
import Loader from "@/_components/Loader/Loader";
import Pagination from "@/_components/Pagination/Pagination";

const WithdrawalsList = () => {
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
  const { table } = useWithdrawalsTable({
    withdrawalsList: transactionData?.list || [],
  });

  return (
    <section css={WithdrawalsPageCss.container}>
      <div css={WithdrawalsPageCss.filtersSection}>
        <div css={WithdrawalsPageCss.filterRow}>
          <TextInput
            placeholder={t("filter.customerId.placeholder")}
            value={customerId}
            onChange={(e) => handleSearchChange(e.target.value)}
            cssStyle={WithdrawalsPageCss.input}
          />

          <div css={WithdrawalsPageCss.inputSection}>
            <DatePicker
              selected={startDate ? new Date(startDate) : null}
              onChange={handleStartDateChange}
              placeholderText={t("filter.startDate.placeholder")}
              cssStyle={WithdrawalsPageCss.input}
            />
          </div>

          <div css={WithdrawalsPageCss.inputSection}>
            <DatePicker
              selected={endDate ? new Date(endDate) : null}
              onChange={handleEndDateChange}
              placeholderText={t("filter.endDate.placeholder")}
              cssStyle={WithdrawalsPageCss.input}
            />
          </div>
          <Button
            type="button"
            buttonType="grayLine"
            onClick={resetFilter}
            cssStyle={WithdrawalsPageCss.resetButton}
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

export default WithdrawalsList;
