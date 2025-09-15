import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseAsString, parseAsBoolean, useQueryState } from "nuqs";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useLocale } from "@/_hooks/useLocale";

export const useFilter = () => {
  const { t } = useLocale();
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const page = Number(params.get("page")) || 0;
  const limit = Number(params.get("limit")) || 50;

  //   하부 포함
  const [isSub, setIsSub] = useQueryState(
    "sub",
    parseAsBoolean.withDefault(false)
  );

  //   검색 타입
  const [customerId, setCustomerId] = useQueryState(
    "customerId",
    parseAsString.withDefault(params.get("customerId") || "")
  );

  //   검색 키워드
  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault(params.get("query") || "")
  );

  // 회원 관련 검색 필드들
  const [searchType, setSearchType] = useQueryState(
    "searchType",
    parseAsString.withDefault(params.get("searchType") || "")
  );

  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(params.get("search") || "")
  );

  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsString.withDefault(params.get("sortBy") || "")
  );

  const [sortOrder, setSortOrder] = useQueryState(
    "sortOrder",
    parseAsString.withDefault(params.get("sortOrder") || "")
  );

  //   지갑
  const [wallet, setWallet] = useQueryState(
    "wallet",
    parseAsString.withDefault(params.get("wallet") || "")
  );

  // 회원 페이지 여부 확인
  const isMemberPage = pathname.includes("/members");

  //   시작 날짜 (회원 페이지에서는 기본값 없음)
  const [startDate, setStartDate] = useQueryState(
    "startDate",
    parseAsString.withDefault(
      params.get("startDate") ||
        (isMemberPage
          ? ""
          : dayjs().startOf("month").format("YYYY-MM-DD HH:00"))
    )
  );

  //   마지막 날짜 (회원 페이지에서는 기본값 없음)
  const [endDate, setEndDate] = useQueryState(
    "endDate",
    parseAsString.withDefault(
      params.get("endDate") ||
        (isMemberPage ? "" : dayjs().format("YYYY-MM-DD HH:00"))
    )
  );

  const [sort, setSort] = useQueryState(
    "sort",
    isMemberPage
      ? parseAsString
      : parseAsString.withDefault(params.get("sort") || "created_at")
  );
  const [sortType, setSortType] = useQueryState(
    "sortType",
    isMemberPage
      ? parseAsString
      : parseAsString.withDefault(params.get("sortType") || "desc")
  );

  //   검색 키워드 변경
  const handleSearchChange = (value: string) => {
    setCustomerId(value);
  };

  //   검색 타입 변경
  const handleSearchTypeChange = (value: string) => {
    setCustomerId(value);
  };

  //   검색 조회
  const handleSubmitSearchQuery = () => {
    if (!customerId) {
      toast.error(t("filter.search.typeAndKeywordRequired"));
      return;
    }
  };

  //   지갑 변경
  const handleWalletChange = (value: string) => {
    setWallet(value, { shallow: true });
  };

  //   시작 날짜 변경
  const handleStartDateChange = (date: Date | null) => {
    if (!date) return;

    //   날짜 포맷팅
    const formattedDate = dayjs(date).format("YYYY-MM-DD HH:00");
    const endDateObj = endDate ? dayjs(endDate) : null;
    const today = dayjs().startOf("day");
    const selectedDate = dayjs(date).startOf("day");

    //   오늘 기준 이전 날짜만 선택 가능
    if (selectedDate.isAfter(today)) {
      toast.error(t("filter.date.beforeTodayOnly"));
      return;
    }

    //   마지막 날짜가 시작 날짜보다 이전일 경우 마지막 날짜 변경
    if (endDateObj && endDateObj.isBefore(date)) {
      setStartDate(endDate, { shallow: true });
    } else {
      setStartDate(formattedDate, { shallow: true });
    }
  };

  //   마지막 날짜 변경
  const handleEndDateChange = (date: Date | null) => {
    if (!date) return;

    //   날짜 포맷팅
    const formattedDate = dayjs(date).format("YYYY-MM-DD HH:00");
    const startDateObj = startDate ? dayjs(startDate) : null;
    const today = dayjs().startOf("day");
    const selectedDate = dayjs(date).startOf("day");

    //   오늘 기준 이전 날짜만 선택 가능
    if (selectedDate.isAfter(today)) {
      toast.error(t("filter.date.beforeTodayOnly"));
      return;
    }

    //   시작 날짜가 마지막 날짜보다 이전일 경우 시작 날짜 변경
    if (startDateObj && startDateObj.isAfter(date)) {
      setEndDate(startDate, { shallow: true });
    } else {
      setEndDate(formattedDate, { shallow: true });
    }
  };

  //   어제 날짜 변경
  const handleChangeYesterday = () => {
    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD HH:00");
    if (!dayjs(yesterday).isSame(dayjs(startDate), "day")) {
      setStartDate(yesterday, { shallow: true });
    }
    if (!dayjs(yesterday).isSame(dayjs(endDate), "day")) {
      setEndDate(yesterday, { shallow: true });
    }
  };

  //   오늘 날짜 변경
  const handleChangeToday = () => {
    const today = dayjs().format("YYYY-MM-DD HH:00");
    if (!dayjs(today).isSame(dayjs(startDate), "day")) {
      setStartDate(today, { shallow: true });
    }
    if (!dayjs(today).isSame(dayjs(endDate), "day")) {
      setEndDate(today, { shallow: true });
    }
  };

  //   일주일 전 날짜 변경
  const handleChangeOneWeek = () => {
    const oneWeekAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD HH:00");
    if (!dayjs(oneWeekAgo).isSame(dayjs(startDate), "day")) {
      setStartDate(oneWeekAgo, { shallow: true });
    }
    if (!dayjs().isSame(dayjs(endDate), "day")) {
      setEndDate(dayjs().format("YYYY-MM-DD HH:00"), { shallow: true });
    }
  };

  const handleChangeSort = (value: string) => {
    if (!value || value === "") {
      // URL에서 sort와 sortType 파라미터 완전히 제거
      const newParams = new URLSearchParams(params.toString());
      newParams.delete("sort");
      newParams.delete("sortType");

      const urlString = newParams.toString();
      router.push(`${pathname}${urlString ? `?${urlString}` : ""}`);
      return;
    }

    const [sortData, sortTypeData] = value.split("-");
    if (sortData && sortData !== sort) {
      setSort(sortData, { shallow: false });
    }
    if (sortTypeData && sortTypeData !== sortType) {
      setSortType(sortTypeData, { shallow: false });
    }
  };

  const { isToday, isYesterday, isOneWeekAgo } = useMemo(() => {
    const today = dayjs().format("YYYY-MM-DD HH:00");
    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD HH:00");
    const oneWeekAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD HH:00");

    return {
      isToday: startDate === today && endDate === today,
      isYesterday: startDate === yesterday && endDate === yesterday,
      isOneWeekAgo: startDate === oneWeekAgo && endDate === today,
    };
  }, [startDate, endDate]);

  //   {t('clearButton')}
  const resetFilter = () => {
    const agentParams = params.get("agent");
    router.push(`${pathname}?agent=${agentParams}`);
    setIsSub(false);
    setCustomerId("");
    setQuery("");
    setWallet("");
    setSearchType("");
    setSearch("");
    setSortBy("");
    setSortOrder("");
    setStartDate(dayjs().startOf("month").format("YYYY-MM-DD HH:00"), {
      shallow: true,
    });
    setEndDate(dayjs().format("YYYY-MM-DD HH:00"), { shallow: true });
    setSort("created_at");
    setSortType("desc");
  };

  // 회원 검색 함수
  const handleMemberSearch = () => {
    // 검색 로직 실행 (이미 URL 파라미터 업데이트는 자동으로 됨)
  };

  // 회원 전용 리셋 함수 (날짜 필드 제외)
  const resetMemberFilter = () => {
    // URL에서 회원 관련 쿼리와 sort 관련 쿼리만 제거하고 다른 params는 유지
    const newParams = new URLSearchParams();

    // 기존 params 중 유지할 것들만 복사 (agent 등)
    const keepParams = ["agent", "page", "limit"];
    keepParams.forEach((key) => {
      const value = params.get(key);
      if (value) {
        newParams.set(key, value);
      }
    });

    // URL 업데이트 (회원 검색 관련 쿼리들과 sort 관련 쿼리들 제거)
    const urlString = newParams.toString();
    router.push(`${pathname}${urlString ? `?${urlString}` : ""}`);

    // 상태 초기화는 URL 업데이트 후 자동으로 처리됨
  };

  return {
    isSub,
    setIsSub,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    resetFilter,
    handleChangeYesterday,
    handleChangeToday,
    handleChangeOneWeek,
    isToday,
    isYesterday,
    isOneWeekAgo,
    handleSearchChange,
    handleSearchTypeChange,
    handleWalletChange,
    customerId,
    query,
    wallet,
    handleSubmitSearchQuery,
    handleChangeSort,
    sort,
    sortType,
    page,
    limit,
    // 회원 관련 필드들
    searchType,
    setSearchType,
    search,
    setSearch,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    handleMemberSearch,
    resetMemberFilter,
  };
};
