import { client } from "@/_service/axios";
import { GetAssetPriceResponseDto } from "../_dtos/getAssetPriceResponse.dto";

export const getAssetPrice = async (): Promise<GetAssetPriceResponseDto> => {
  try {
    const res = await client.get<GetAssetPriceResponseDto>("/asset/price", {
      headers: {
        Authorization: "8f3cbffc-4f62-4e7d-a973-afebfcd0b8d3",
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
