import { queryOptions, useQuery } from '@tanstack/react-query';
import { GetMyInfoResponseDto } from '../_dtos/getMyInfoResponse.dto';
import { getMyInfo } from '../getMyinfo';

const MY_INFO = 'myInfo';

export const myInfoOptions = queryOptions<GetMyInfoResponseDto>({
  queryKey: [MY_INFO],
  queryFn: getMyInfo,
  refetchInterval: 1000 * 60 * 1,
});

export const useMyInfoQuery = () => {
  return useQuery({
    ...myInfoOptions,
  });
};
