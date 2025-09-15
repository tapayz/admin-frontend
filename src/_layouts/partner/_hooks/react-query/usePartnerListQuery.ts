import { queryOptions, useQuery } from "@tanstack/react-query";
import { AgencyListResponseType } from "../../_dtos/getPartnerListResponse.dto";
import { GetPartnerListRequestDto } from "../../_dtos/getPartnerListRequest.dto";
import { useFilter } from "@/_hooks/useFilter";
import { useMemo } from "react";
import { getPartnerList } from "../../_actions/getPartnerList";

const HIERARCHY_TREE = "hierarchyTree";

export const partnerListOptions = (params: GetPartnerListRequestDto) =>
  queryOptions<AgencyListResponseType>({
    queryKey: [HIERARCHY_TREE, params],
    queryFn: () => getPartnerList(params),
    refetchInterval: 1000 * 60 * 5, // 5분마다 리프레시
  });

export const usePartnersQuery = () => {
  const { page, limit } = useFilter();

  const params = useMemo((): GetPartnerListRequestDto => {
    return {
      page: page || 0,
      limit: limit || 50,
    };
  }, [page, limit]);

  return useQuery(partnerListOptions(params));
};
