import { client } from "@/_service/axios";
import { GetTransactionListRequestDto } from "../_dtos/getTransactionListRequest.dto";
import { GetTransactionListResponseDto } from "../_dtos/getTransactionListResponse.dto";

export const getTransactionList = async (
  params: GetTransactionListRequestDto
): Promise<GetTransactionListResponseDto> => {
  try {
    const res = await client.get<GetTransactionListResponseDto>("/transaction", {
      params,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};