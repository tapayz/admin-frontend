import { queryOptions, useQuery } from "@tanstack/react-query";
import { GetMemberDetailResponseDto } from "../../_dtos/getMemberDetailResponse.dto";
import { getMemberDetail } from "../../_actions/getMemberDetail";
import { useMemberDetailStore } from "../../_store/useMemberDetailStore";

const MEMBER_DETAIL = "memberDetail";


export const memberDetailOptions = (id: string) =>
  queryOptions<GetMemberDetailResponseDto>({
    queryKey: [MEMBER_DETAIL, id],
    queryFn: () => getMemberDetail(id),
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });

export const useMemberDetailQuery = () => {
  const { id } = useMemberDetailStore();

  return useQuery({
    ...memberDetailOptions(id ?? ""),
    enabled: !!id && id !== "",
  });
};
