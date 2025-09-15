import { client } from "@/_service/axios";
import { PartnerInfoUpdateRequestDto } from "../_dtos/partnerInfoUpdateRequest.dto";

export const updatePartnerInfo = async ({
  partnerId,
  data,
}: {
  partnerId: number;
  data: PartnerInfoUpdateRequestDto;
}) => {
  try {
    const response = await client.post(`/partners/info/${partnerId}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
