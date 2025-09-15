import { client } from "@/_service/axios";
import { AddMemberMemoDto } from "../_dtos/addMemberMemo.dto";
import { MemoOperationResponseDto } from "../_dtos/customerResponse.dto";

export const addMemberMemo = async (data: AddMemberMemoDto): Promise<MemoOperationResponseDto> => {
  try {
    const response = await client.post<MemoOperationResponseDto>("/customer/memo", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
