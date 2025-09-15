import { client } from "@/_service/axios";
import { CheckDuplicateRequestDto } from "../_dtos/checkDuplicateRequest.dto";
import { CheckDuplicateResponseDto } from "../_dtos/checkDuplicateResponse.dto";

export const checkDuplicate = async (params: CheckDuplicateRequestDto): Promise<CheckDuplicateResponseDto> => {
  try {
    const res = await client.get<CheckDuplicateResponseDto>("/auth/duplicated", {
      params
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};