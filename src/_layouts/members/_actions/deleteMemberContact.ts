import { client } from "@/_service/axios";
import { DeleteMemberContactDto } from "../_dtos/deleteMemberContact.dto";
import { ContactOperationResponseDto } from "../_dtos/customerResponse.dto";

export const deleteMemberContact = async (data: DeleteMemberContactDto): Promise<ContactOperationResponseDto> => {
  try {
    const response = await client.post<ContactOperationResponseDto>("/customer/contact/delete", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
