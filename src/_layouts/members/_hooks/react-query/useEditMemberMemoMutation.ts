import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { editMemberMemo } from "../../_actions/editMemberMemo";
import { EditMemberMemoDto } from "../../_dtos/editMemberMemo.dto";
import toast from "react-hot-toast";
import { memberDetailOptions } from "./useMemberDetailQuery";
import { useLocale } from "@/_hooks/useLocale";

export const useEditMemberMemoMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useLocale();

  return useMutation({
    mutationFn: (data: EditMemberMemoDto) => editMemberMemo(data),
    onSuccess: (_, variables) => {
      toast.success(t("member.memoUpdateSuccess"));
      
      queryClient.invalidateQueries({ 
        queryKey: memberDetailOptions(variables.targetId.toString()).queryKey 
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || t("member.memoUpdateFailed"));
    },
  });
};