import { client } from "@/_service/axios";
import { JoinRequestDto } from "../_dtos/joinRequest.dto";
import { JoinResponseDto } from "../_dtos/joinResponse.dto";

export const join = async (data: JoinRequestDto): Promise<JoinResponseDto> => {
  try {
    const res = await client.post<JoinResponseDto>("/auth/join", data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};