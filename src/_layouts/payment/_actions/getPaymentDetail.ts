import { client } from "@/_service/axios";
import { GetPaymentDetailResponseDto } from "../_dtos/getPaymentDetailResponse.dto";

export const getPaymentDetail = async (id: string): Promise<GetPaymentDetailResponseDto> => {
  try {
    const res = await client.get<GetPaymentDetailResponseDto>(`/invoice/detail?id=${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};