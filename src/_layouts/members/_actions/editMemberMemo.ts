import { client } from "@/_service/axios";
import { EditMemberMemoDto } from "../_dtos/editMemberMemo.dto";
import { MemoOperationResponseDto } from "../_dtos/customerResponse.dto";

export const editMemberMemo = async (data: EditMemberMemoDto): Promise<MemoOperationResponseDto> => {
  try {
    const response = await client.post<MemoOperationResponseDto>("/customer/memo/edit", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
