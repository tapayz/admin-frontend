import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteMemberMemo } from "../../_actions/deleteMemberMemo";
import { DeleteMemberMemoDto } from "../../_dtos/deleteMemberMemo.dto";
import toast from "react-hot-toast";
import { memberDetailOptions } from "./useMemberDetailQuery";
import { useLocale } from "@/_hooks/useLocale";

export const useDeleteMemberMemoMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useLocale();

  return useMutation({
    mutationFn: (data: DeleteMemberMemoDto) => deleteMemberMemo(data),
    onSuccess: (_, variables) => {
      toast.success(t("member.memoDeleteSuccess"));
      
      queryClient.invalidateQueries({ 
        queryKey: memberDetailOptions(variables.targetId.toString()).queryKey 
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || t("member.memoDeleteFailed"));
    },
  });
};