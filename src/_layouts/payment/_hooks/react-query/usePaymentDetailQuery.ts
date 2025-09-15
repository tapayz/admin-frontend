import { queryOptions, useQuery } from "@tanstack/react-query";
import { GetPaymentDetailResponseDto } from "../../_dtos/getPaymentDetailResponse.dto";
import { getPaymentDetail } from "../../_actions/getPaymentDetail";
import { usePaymentStore } from "../../_store/usePaymentStore";

// 쿼리 키
const PAYMENT_DETAIL_QUERY_KEY = {
  payment: ['payment'] as const,
  detail: (payId: string) => [...PAYMENT_DETAIL_QUERY_KEY.payment, 'detail', payId] as const,
} as const;

// 쿼리 옵션
export const paymentDetailQueryOptions = (payId: string, isIntervalSet: boolean, invoiceState: string) =>
  queryOptions<GetPaymentDetailResponseDto | null>({
    queryKey: PAYMENT_DETAIL_QUERY_KEY.detail(payId),
    queryFn: async (): Promise<GetPaymentDetailResponseDto | null> => {
      if (isIntervalSet === false) {
        return null;
      }
      if (invoiceState === 'Complete' || invoiceState === 'Cancel') {
        return null;
      }

      return await getPaymentDetail(payId);
    },
    refetchInterval: 10000,
    refetchOnWindowFocus: false,
    enabled: !!payId && isIntervalSet && invoiceState !== 'Complete' && invoiceState !== 'Cancel',
  });

// 커스텀 훅
export const usePaymentDetailQuery = () => {
  const { paymentId, isIntervalSet, invoiceState } = usePaymentStore();
  
  return useQuery(paymentDetailQueryOptions(paymentId || '', isIntervalSet, invoiceState));
};