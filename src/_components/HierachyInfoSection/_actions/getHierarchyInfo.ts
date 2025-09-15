import { client } from "@/_service/axios";
import { GetHierarchyInfoRequestDto } from "../_dtos/GetHierarchyInfoRequset.dto";
import { GetHierarchyInfoResponseDto } from "../_dtos/GetHierarchyInfoResponse.dto";

export const getHierarchyInfo = async ({
  targetAgentId,
}: GetHierarchyInfoRequestDto) => {
  try {
    const response = await client.get<GetHierarchyInfoResponseDto>(
      "/agents/hierarchy-tree",
      {
        params: { targetAgentId },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get hierarchy info");
  }
};
