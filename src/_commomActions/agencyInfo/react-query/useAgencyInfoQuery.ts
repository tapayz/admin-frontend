import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAgencyInfo } from "@/_commomActions/agencyInfo/getAgencyInfo";
import { GetAgencyInfoResponse } from "../_dtos/getAgencyInfoResponse.dto";

const AGENCY_INFO_QUERY_KEY = "agencyInfo";

export const agencyInfoOptions = (agentId: number | null) =>
  queryOptions<GetAgencyInfoResponse>({
    queryKey: [AGENCY_INFO_QUERY_KEY, agentId],
    queryFn: () => getAgencyInfo(agentId),
    enabled: !!agentId,
  });

export const useAgencyInfoQuery = (agentId: number | null) => {
  return useQuery({
    ...agencyInfoOptions(agentId),
    enabled: !!agentId,
  });
};
