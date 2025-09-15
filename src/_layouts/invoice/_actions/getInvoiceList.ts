import { client } from "@/_service/axios";
import { GetInvoiceListResponseDto } from "../_dtos/getInvoiceListResponse.dto";
import { GetInvoiceListRequestDto } from "../_dtos/getInvoiceListRequest.dto";

export const getInvoiceList = async (
  params: GetInvoiceListRequestDto
): Promise<GetInvoiceListResponseDto> => {
  try {
    const res = await client.get<GetInvoiceListResponseDto>("/invoice/list", {
      params,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
