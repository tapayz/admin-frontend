import { client } from "@/_service/axios";
import { PartnerUpdateRequestDto } from "../_dtos/partnerUpdateRequest.dto";

export const updatePartner = async (data: PartnerUpdateRequestDto) => {
  try {
    const res = await client.post("/partner/update", data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};