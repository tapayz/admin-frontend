import { client } from "@/_service/axios";
import { EditMemberContactDto } from "../_dtos/editMemberContact.dto";
import { ContactOperationResponseDto } from "../_dtos/customerResponse.dto";

export const editMemberContact = async (data: EditMemberContactDto): Promise<ContactOperationResponseDto> => {
  try {
    const response = await client.post<ContactOperationResponseDto>("/customer/contact/edit", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
