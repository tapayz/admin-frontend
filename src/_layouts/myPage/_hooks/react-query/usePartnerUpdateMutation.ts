import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePartner } from "../../_actions/updatePartner";
import { PartnerUpdateRequestDto } from "../../_dtos/partnerUpdateRequest.dto";
import { myInfoOptions } from "@/_commomActions/myInfo/react-query/useMyInfoQuery";

export const usePartnerUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PartnerUpdateRequestDto) => updatePartner(data),
    onSuccess: () => {
      // 성공 시 myInfo 데이터 재요청
      queryClient.invalidateQueries(myInfoOptions);
    },
  });
};