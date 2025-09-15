import { client } from "@/_service/axios";
import { AgencyListResponseType } from "../_dtos/getPartnerListResponse.dto";
import { GetPartnerListRequestDto } from "../_dtos/getPartnerListRequest.dto";

export const getPartnerList = async (params: GetPartnerListRequestDto) => {
  try {
    const res = await client.get<AgencyListResponseType>("/partner/list", {
      params,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
};
