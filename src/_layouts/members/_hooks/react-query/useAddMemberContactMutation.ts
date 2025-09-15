import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { addMemberContact } from "../../_actions/addMemberContact";
import { AddMemberContactDto } from "../../_dtos/addMemberContact.dto";
import toast from "react-hot-toast";
import { memberDetailOptions } from "./useMemberDetailQuery";
import { useLocale } from "@/_hooks/useLocale";

export const useAddMemberContactMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useLocale();

  return useMutation({
    mutationFn: (data: AddMemberContactDto) => addMemberContact(data),
    onSuccess: (_, variables) => {
      toast.success(t("member.contactAddSuccess"));
      
      queryClient.invalidateQueries({ 
        queryKey: memberDetailOptions(variables.targetId.toString()).queryKey 
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || t("member.contactAddFailed"));
    },
  });
};