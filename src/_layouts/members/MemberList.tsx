"use client";

import React from "react";
import { memberListStyles } from "./MemberList.styles";
import { useMemberListQuery } from "./_hooks/react-query/useMemberListQuery";
import { useMemberTable } from "./_hooks/useMemberTable";
import AppTable from "@/_components/Table/Table";
import { useMemberDetailStore } from "./_store/useMemberDetailStore";
import MemberDetailModal from "@/_components/Modals/MemberDetailModal/MemberDetailModal";
import TableWrapper from "@/_components/TableWrapper/TableWrapper";
import { MemberFilters } from "./_components/MemberFilters/MemberFilters";
import { useFilter } from "@/_hooks/useFilter";
import { SortDirection } from "@/_components/TableSort/TableSort";
import Pagination from "@/_components/Pagination/Pagination";

const MemberList = () => {
  const {
    searchType,
    setSearchType,
    search,
    setSearch,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    resetMemberFilter,
    sort,
    sortType,
    handleChangeSort,
  } = useFilter();

  const { data: memberList } = useMemberListQuery();

  const handleSort = (sortKey: string, direction: SortDirection) => {
    const sortValue = direction ? `${sortKey}-${direction}` : "";
    handleChangeSort(sortValue);
  };

  const { table } = useMemberTable({
    memberList: memberList?.list || [],
    currentSort: sort || "createdAt",
    currentSortDirection: (sortType || "desc") as SortDirection,
    onSort: handleSort,
  });

  const { id, setId } = useMemberDetailStore();

  return (
    <div css={memberListStyles.container}>
      <MemberFilters
        searchType={searchType as "name" | "email" | "phone" | "id" | ""}
        search={search}
        onReset={resetMemberFilter}
        onSearchTypeChange={setSearchType}
      />

      <TableWrapper>
        <AppTable table={table} />
        <Pagination total={memberList?.total || 0} />
      </TableWrapper>

      {id && id !== "" && (
        <MemberDetailModal isOpen={!!id} onClose={() => setId(null)} id={id} />
      )}
    </div>
  );
};

export default MemberList;
