import { client } from "@/_service/axios";
import { GetMemberDetailResponseDto } from "../_dtos/getMemberDetailResponse.dto";

export const getMemberDetail = async (
  id: string
): Promise<GetMemberDetailResponseDto> => {
  try {
    const res = await client.get<GetMemberDetailResponseDto>(
      `/customer/detail?id=${Number(id)}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
