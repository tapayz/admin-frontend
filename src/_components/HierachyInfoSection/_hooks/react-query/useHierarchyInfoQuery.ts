import { queryOptions, useQuery } from '@tanstack/react-query';
import { GetHierarchyInfoResponseDto } from '../../_dtos/GetHierarchyInfoResponse.dto';
import { GetHierarchyInfoRequestDto } from '../../_dtos/GetHierarchyInfoRequset.dto';
import { getHierarchyInfo } from '../../_actions/getHierarchyInfo';
import { useSearchParams } from 'next/navigation';

const HIERARCHY_INFO_QUERY_KEY = 'hierarchyInfo';

export const hierarchyInfoQueryOptions = ({ targetAgentId }: GetHierarchyInfoRequestDto) =>
  queryOptions<GetHierarchyInfoResponseDto>({
    queryKey: [HIERARCHY_INFO_QUERY_KEY, targetAgentId],
    queryFn: () => getHierarchyInfo({ targetAgentId }),
  });

export const useHierarchyInfoQuery = () => {
  const params = useSearchParams();
  const targetAgentId = params.get('targetAgentId') || undefined;

  return useQuery({
    ...hierarchyInfoQueryOptions({ targetAgentId }),
  });
};
