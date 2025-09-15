import { client } from "@/_service/axios";
import { AddMemberContactDto } from "../_dtos/addMemberContact.dto";
import { ContactOperationResponseDto } from "../_dtos/customerResponse.dto";

export const addMemberContact = async (data: AddMemberContactDto): Promise<ContactOperationResponseDto> => {
  try {
    const response = await client.post<ContactOperationResponseDto>("/customer/contact", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
