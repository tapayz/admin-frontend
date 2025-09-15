import { client } from "@/_service/axios";
import { SignoutResponseDto } from "./_dto/signoutResponse.dto";

export const signout = async () => {
  try {
    const res = await client.post<SignoutResponseDto>("/auth/signout");
    return res.data.message;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
