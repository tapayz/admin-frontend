import { client } from "@/_service/axios";
import { EditMemberNameDto } from "../_dtos/editMemberName.dto";
import { NameEditResponseDto } from "../_dtos/customerResponse.dto";

export const editMemberName = async (data: EditMemberNameDto): Promise<NameEditResponseDto> => {
  try {
    const response = await client.post<NameEditResponseDto>("/customer/name", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
