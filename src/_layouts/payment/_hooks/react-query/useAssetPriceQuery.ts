import { queryOptions, useQuery } from "@tanstack/react-query";
import { GetAssetPriceResponseDto } from "../../_dtos/getAssetPriceResponse.dto";
import { getAssetPrice } from "../../_actions/getAssetPrice";

// 쿼리 키
const ASSET_PRICE_QUERY_KEY = {
  payment: ['payment'] as const,
  assetPrice: () => [...ASSET_PRICE_QUERY_KEY.payment, 'assetPrice'] as const,
} as const;

// 쿼리 옵션
export const assetPriceQueryOptions = () =>
  queryOptions<GetAssetPriceResponseDto>({
    queryKey: ASSET_PRICE_QUERY_KEY.assetPrice(),
    queryFn: async (): Promise<GetAssetPriceResponseDto> => {
      return await getAssetPrice();
    },
    staleTime: 30000, // 30초간 캐시 유지
    refetchInterval: 60000, // 1분마다 자동 갱신
    refetchOnWindowFocus: true, // 윈도우 포커스시 갱신
  });

// 커스텀 훅
export const useAssetPriceQuery = () => {
  return useQuery(assetPriceQueryOptions());
};