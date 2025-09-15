import { client } from "@/_service/axios";
import { CheckDuplicateRequestDto } from "../_dtos/checkDupligateRequest.dto";
import { CheckDuplicateResponseDto } from "../_dtos/checkDupligateResponse.dto";

export const checkDuplicate = async ({
  prefix,
  username,
}: CheckDuplicateRequestDto): Promise<CheckDuplicateResponseDto | null> => {
  if (!prefix && !username) {
    return null;
  }

  try {
    const response = await client.post(
      "/agents/check-duplicate",
      {},
      {
        params: {
          prefix,
          username,
        },
      }
    );

    return {
      result: response.data,
      field: {
        label: prefix ? "prefix" : "username",
        value: prefix ? prefix : username ?? "",
      },
    };
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response?.data.message);
  }
};
