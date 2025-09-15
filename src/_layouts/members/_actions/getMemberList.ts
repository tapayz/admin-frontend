import { client } from "@/_service/axios";
import { MemberListResponseType } from "../_dtos/getMemberListResponse.dto";
import { GetMemberListRequestDto } from "../_dtos/getMemberListRequest.dto";

export const getMemberList = async (
  params?: GetMemberListRequestDto
): Promise<MemberListResponseType> => {
  try {
    const res = await client.get<MemberListResponseType>("/customer/list", {
      params,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
