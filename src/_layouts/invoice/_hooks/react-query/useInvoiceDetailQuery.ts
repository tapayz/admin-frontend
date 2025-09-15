import { queryOptions, useQuery } from "@tanstack/react-query";
import { GetInvoiceDetailResponseDto } from "../../_dtos/getInvoiceDetailResponse.dto";
import { getInvoiceDetail } from "../../_actions/getInvoiceDetail";
import { useInvoiceDetailStore } from "../../_store/useInvoiceDetailStore";

const INVOICE_DETAIL = "invoiceDetail";


export const invoiceDetailOptions = (id: string) =>
  queryOptions<GetInvoiceDetailResponseDto>({
    queryKey: [INVOICE_DETAIL, id],
    queryFn: () => getInvoiceDetail(id),
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });

export const useInvoiceDetailQuery = () => {
  const { id } = useInvoiceDetailStore();

  return useQuery({
    ...invoiceDetailOptions(id ?? ""),
    enabled: !!id && id !== "",
  });
};
