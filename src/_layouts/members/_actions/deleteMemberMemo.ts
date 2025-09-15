import { client } from "@/_service/axios";
import { DeleteMemberMemoDto } from "../_dtos/deleteMemberMemo.dto";
import { MemoOperationResponseDto } from "../_dtos/customerResponse.dto";

export const deleteMemberMemo = async (data: DeleteMemberMemoDto): Promise<MemoOperationResponseDto> => {
  try {
    const response = await client.post<MemoOperationResponseDto>("/customer/memo/delete", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
