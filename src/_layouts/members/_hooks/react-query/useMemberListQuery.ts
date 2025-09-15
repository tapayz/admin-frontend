import { queryOptions, useQuery } from "@tanstack/react-query";
import { MemberListResponseType } from "../../_dtos/getMemberListResponse.dto";
import { GetMemberListRequestDto } from "../../_dtos/getMemberListRequest.dto";
import { getMemberList } from "../../_actions/getMemberList";
import { useFilter } from "@/_hooks/useFilter";
import { useMemo } from "react";

const MEMBER_LIST = "memberList";

export const memberListOptions = (params: GetMemberListRequestDto) =>
  queryOptions<MemberListResponseType>({
    queryKey: [MEMBER_LIST, params],
    queryFn: () => getMemberList(params),
    refetchInterval: 1000 * 60 * 5, // 5분마다 리프레시
  });

export const useMemberListQuery = () => {
  const { searchType, search, sort, sortType, page, limit } = useFilter();

  // 빈값인 파라미터 제거하여 쿼리 파라미터 구성
  const params = useMemo(() => {
    const queryParams: GetMemberListRequestDto = {
      page: page || 0,
      size: limit || 50,
    };

    if (searchType && searchType.trim()) {
      queryParams.searchType = searchType.trim() as
        | "name"
        | "email"
        | "phone"
        | "id";
    }
    if (search && search.trim()) {
      queryParams.search = search.trim();
    }
    if (sort && sort.trim()) {
      queryParams.sortBy = sort.trim() as "name" | "createdAt" | "updatedAt";
    } else {
      queryParams.sortBy = "createdAt";
    }
    if (sortType && sortType.trim()) {
      queryParams.sortOrder = sortType.trim() as "asc" | "desc";
    } else {
      queryParams.sortOrder = "desc";
    }

    return queryParams;
  }, [searchType, search, sort, sortType, page, limit]);

  return useQuery(memberListOptions(params));
};
