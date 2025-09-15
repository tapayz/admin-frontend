import { client } from "@/_service/axios";
import { EditMemberIconDto } from "../_dtos/editMemberIcon.dto";
import { IconUploadResponseDto } from "../_dtos/customerResponse.dto";

export const uploadMemberIcon = async (data: EditMemberIconDto, file: File): Promise<IconUploadResponseDto> => {
  try {
    const formData = new FormData();
    formData.append("targetId", data.targetId.toString());
    formData.append("file", file);

    const response = await client.post<IconUploadResponseDto>("/customer/icon", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
