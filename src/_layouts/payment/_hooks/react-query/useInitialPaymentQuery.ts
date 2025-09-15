import { queryOptions, useQuery } from "@tanstack/react-query";
import { GetPaymentDetailResponseDto } from "../../_dtos/getPaymentDetailResponse.dto";
import { getPaymentDetail } from "../../_actions/getPaymentDetail";
import { usePaymentStore } from "../../_store/usePaymentStore";

// 쿼리 키
const INITIAL_PAYMENT_QUERY_KEY = {
  payment: ['payment'] as const,
  initial: (payId: string) => [...INITIAL_PAYMENT_QUERY_KEY.payment, 'initial', payId] as const,
} as const;

// 쿼리 옵션
export const initialPaymentQueryOptions = (payId: string) =>
  queryOptions<GetPaymentDetailResponseDto>({
    queryKey: INITIAL_PAYMENT_QUERY_KEY.initial(payId),
    queryFn: async (): Promise<GetPaymentDetailResponseDto> => {
      return await getPaymentDetail(payId);
    },
    enabled: !!payId,
    staleTime: 0, // 항상 fresh한 데이터를 가져오기 위해
  });

// 커스텀 훅
export const useInitialPaymentQuery = () => {
  const { paymentId } = usePaymentStore();
  
  return useQuery(initialPaymentQueryOptions(paymentId || ''));
};