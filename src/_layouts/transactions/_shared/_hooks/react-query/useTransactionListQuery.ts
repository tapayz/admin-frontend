import { useQuery, queryOptions } from "@tanstack/react-query";
import { getTransactionList } from "../../_actions/getTransactionList";
import { GetTransactionListRequestDto, TxState } from "../../_dtos/getTransactionListRequest.dto";
import { GetTransactionListResponseDto } from "../../_dtos/getTransactionListResponse.dto";
import { useFilter } from "@/_hooks/useFilter";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import dayjs from "dayjs";

const TRANSACTION_LIST = "transactionList";


export const transactionListOptions = (params: GetTransactionListRequestDto) =>
  queryOptions<GetTransactionListResponseDto>({
    queryKey: [TRANSACTION_LIST, params],
    queryFn: () => getTransactionList(params),
    refetchInterval: 1000 * 60 * 5, // 5분마다 리프레시
  });

export const useTransactionListQuery = () => {
  const { startDate, endDate, customerId, limit, page } = useFilter();

  const pathname = usePathname();

  const params = useMemo((): GetTransactionListRequestDto => {
    // pathname에 따라 type 결정
    const type = pathname.includes("deposits") ? TxState.DEPOSIT : TxState.WITHDRAW;

    // startAt: 선택된 시간이 있으면 그대로, 없으면 00:00으로
    const startAtDate = startDate 
      ? dayjs(startDate).toDate()
      : dayjs().startOf('day').toDate();

    // endAt: 선택된 시간이 있으면 선택시간 +1시간(분까지), 없으면 현재시간(분까지)
    const endAtDate = endDate
      ? dayjs(endDate).add(1, 'hour').toDate()
      : dayjs().startOf('minute').toDate();

    return {
      size: limit,
      page: page || 0,
      startAt: startAtDate,
      endAt: endAtDate,
      customerId: customerId ? parseInt(customerId) : undefined,
      type,
    };
  }, [startDate, endDate, customerId, limit, page, pathname]);

  return useQuery(transactionListOptions(params));
};
