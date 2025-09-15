import { useQuery, queryOptions } from "@tanstack/react-query";
import { getInvoiceList } from "../../_actions/getInvoiceList";
import { GetInvoiceListRequestDto } from "../../_dtos/getInvoiceListRequest.dto";
import { GetInvoiceListResponseDto } from "../../_dtos/getInvoiceListResponse.dto";
import { useFilter } from "@/_hooks/useFilter";
import { useMemo } from "react";
import dayjs from "dayjs";

const INVOICE_LIST = "invoiceList";


export const invoiceListOptions = (params: GetInvoiceListRequestDto) =>
  queryOptions<GetInvoiceListResponseDto>({
    queryKey: [INVOICE_LIST, params],
    queryFn: () => getInvoiceList(params),
    refetchInterval: 1000 * 60 * 5, // 5분마다 리프레시
  });

export const useInvoiceListQuery = () => {
  const { startDate, endDate, customerId, limit, page } = useFilter();

  const params = useMemo((): GetInvoiceListRequestDto => {
    return {
      size: limit,
      page: page || 0,
      startAt: startDate ? startDate.split(" ")[0] : dayjs().startOf("month").format("YYYY-MM-DD"),
      endAt: endDate ? endDate.split(" ")[0] : dayjs().format("YYYY-MM-DD"),
      customerId: customerId || undefined,
    };
  }, [startDate, endDate, customerId, limit, page]);

  return useQuery(invoiceListOptions(params));
};