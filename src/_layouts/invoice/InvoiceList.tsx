"use client";

import React from "react";
import TextInput from "@/_components/TextInput/TextInput";
import Button from "@/_components/Button/Button";
import DatePicker from "@/_components/DatePicker/DatePicker";
import { invoiceListStyles } from "./InvoiceList.styles";
import { useInvoiceListQuery } from "./_hooks/react-query/useInvoiceListQuery";
import { useInvoiceTable } from "./_hooks/useInvoiceTable";
import { useLocale } from "@/_hooks/useLocale";
import { useFilter } from "@/_hooks/useFilter";
import AppTable from "@/_components/Table/Table";
import TableWrapper from "@/_components/TableWrapper/TableWrapper";
import Loader from "@/_components/Loader/Loader";
import { useInvoiceDetailStore } from "./_store/useInvoiceDetailStore";
import InvoiceDetailModal from "@/_components/Modals/InvoiceDetailModal/InvoiceDetailModal";
import Pagination from "@/_components/Pagination/Pagination";

const InvoiceList = () => {
  const { t } = useLocale();
  const {
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    resetFilter,
    customerId,
    handleSearchChange,
    handleSubmitSearchQuery,
  } = useFilter();

  const { data: invoiceData, isLoading } = useInvoiceListQuery();
  const { table } = useInvoiceTable({
    invoiceList: invoiceData?.list || [],
  });
  const { id, setId } = useInvoiceDetailStore();

  return (
    <section css={invoiceListStyles.container}>
      <div css={invoiceListStyles.filtersSection}>
        <div css={invoiceListStyles.filterRow}>
          <TextInput
            placeholder={t("filter.customerId.placeholder")}
            value={customerId}
            onChange={(e) => handleSearchChange(e.target.value)}
            cssStyle={invoiceListStyles.input}
          />

          <div css={invoiceListStyles.inputSection}>
            <DatePicker
              selected={startDate ? new Date(startDate) : null}
              onChange={handleStartDateChange}
              placeholderText={t("filter.startDate.placeholder")}
              cssStyle={invoiceListStyles.input}
            />
          </div>

          <div css={invoiceListStyles.inputSection}>
            <DatePicker
              selected={endDate ? new Date(endDate) : null}
              onChange={handleEndDateChange}
              placeholderText={t("filter.endDate.placeholder")}
              cssStyle={invoiceListStyles.input}
            />
          </div>

          <Button
            type="button"
            buttonType="grayLine"
            onClick={resetFilter}
            cssStyle={invoiceListStyles.resetButton}
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
          <Pagination total={invoiceData?.total || 0} />
        </TableWrapper>
      )}

      {id && id !== "" && (
        <InvoiceDetailModal isOpen={!!id} onClose={() => setId(null)} id={id} />
      )}
    </section>
  );
};

export default InvoiceList;
