import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { editMemberContact } from "../../_actions/editMemberContact";
import { EditMemberContactDto } from "../../_dtos/editMemberContact.dto";
import toast from "react-hot-toast";
import { memberDetailOptions } from "./useMemberDetailQuery";
import { useLocale } from "@/_hooks/useLocale";

export const useEditMemberContactMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useLocale();

  return useMutation({
    mutationFn: (data: EditMemberContactDto) => editMemberContact(data),
    onSuccess: (_, variables) => {
      toast.success(t("member.contactUpdateSuccess"));
      
      queryClient.invalidateQueries({ 
        queryKey: memberDetailOptions(variables.targetId.toString()).queryKey 
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || t("member.contactUpdateFailed"));
    },
  });
};