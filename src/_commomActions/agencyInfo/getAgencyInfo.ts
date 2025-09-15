import { client } from "@/_service/axios";
import { GetAgencyInfoResponse } from "./_dtos/getAgencyInfoResponse.dto";

export const getAgencyInfo = async (agentId: number | null) => {
  try {
    const response = await client.get<GetAgencyInfoResponse>(`/agents/detail`, {
      params: {
        agentId,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response?.data.message);
  }
};
