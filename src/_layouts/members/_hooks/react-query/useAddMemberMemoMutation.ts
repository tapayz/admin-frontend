import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { addMemberMemo } from "../../_actions/addMemberMemo";
import { AddMemberMemoDto } from "../../_dtos/addMemberMemo.dto";
import toast from "react-hot-toast";
import { memberDetailOptions } from "./useMemberDetailQuery";
import { useLocale } from "@/_hooks/useLocale";

export const useAddMemberMemoMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useLocale();

  return useMutation({
    mutationFn: (data: AddMemberMemoDto) => addMemberMemo(data),
    onSuccess: (_, variables) => {
      toast.success(t("member.memoAddSuccess"));
      
      queryClient.invalidateQueries({ 
        queryKey: memberDetailOptions(variables.targetId.toString()).queryKey 
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || t("member.memoAddFailed"));
    },
  });
};