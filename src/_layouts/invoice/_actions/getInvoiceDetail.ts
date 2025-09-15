import { client } from "@/_service/axios";
import { GetInvoiceDetailResponseDto } from "../_dtos/getInvoiceDetailResponse.dto";

export const getInvoiceDetail = async (id: string): Promise<GetInvoiceDetailResponseDto> => {
  try {
    const res = await client.get<GetInvoiceDetailResponseDto>(`/invoice/detail?id=${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};