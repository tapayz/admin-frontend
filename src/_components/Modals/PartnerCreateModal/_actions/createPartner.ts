import { client } from "@/_service/axios";
import { PartnerCreateDto } from "../_dtos/partnerCreate.dto";

export const createPartner = async (data: PartnerCreateDto) => {
  try {
    const res = await client.post<PartnerCreateDto>(
      "/partner/create-child",
      data
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
