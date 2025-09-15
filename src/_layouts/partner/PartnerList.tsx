"use client";

import React, { useState } from "react";
import { partnerListCss } from "./PartnerList.styles";
import AppTable from "@/_components/Table/Table";
import Loader from "@/_components/SectionLoader/SectionLoader";

import { usePartnersTable } from "./_hooks/usePartnerTable";
import { usePartnersQuery } from "./_hooks/react-query/usePartnerListQuery";
import PartnerCreateModal from "@/_components/Modals/PartnerCreateModal/PartnerCreateModal";

import { useLocale } from "@/_hooks/useLocale";
import Button from "@/_components/Button/Button";
import TableWrapper from "@/_components/TableWrapper/TableWrapper";
import Pagination from "@/_components/Pagination/Pagination";

const PartnersContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"hierarchy" | "list">("hierarchy");

  // 기존 리스트 데이터
  const { data: listData, isLoading: isListLoading } = usePartnersQuery();

  const { table: partnersTable } = usePartnersTable({
    PartnerList: listData?.hierarchyTree || null,
  });

  const { t } = useLocale();

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isListLoading) return <Loader />;

  return (
    <div css={partnerListCss.container}>
      <div css={partnerListCss.header}>
        <Button buttonType="primary" onClick={onOpenModal}>
          {t("partner.partnerCreate")}
        </Button>
      </div>
      <TableWrapper>
        {isListLoading ? (
          <Loader />
        ) : (
          <AppTable table={partnersTable} cssStyle={partnerListCss.table} />
        )}
        <Pagination total={listData?.total || 1} />
      </TableWrapper>

      {isModalOpen && (
        <PartnerCreateModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          title={t("partner.childAdd")}
        />
      )}
    </div>
  );
};

export default PartnersContainer;
