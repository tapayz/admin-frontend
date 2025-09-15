import { client } from "@/_service/axios";
import { GetMyInfoResponseDto } from "./_dtos/getMyInfoResponse.dto";

export const getMyInfo = async () => {
  try {
    const res = await client.get<GetMyInfoResponseDto>("/partner/myinfo");

    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response?.data.message);
  }
};
