import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteMemberContact } from "../../_actions/deleteMemberContact";
import { DeleteMemberContactDto } from "../../_dtos/deleteMemberContact.dto";
import toast from "react-hot-toast";
import { memberDetailOptions } from "./useMemberDetailQuery";
import { useLocale } from "@/_hooks/useLocale";

export const useDeleteMemberContactMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useLocale();

  return useMutation({
    mutationFn: (data: DeleteMemberContactDto) => deleteMemberContact(data),
    onSuccess: (_, variables) => {
      toast.success(t("member.contactDeleteSuccess"));
      
      queryClient.invalidateQueries({ 
        queryKey: memberDetailOptions(variables.targetId.toString()).queryKey 
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || t("member.contactDeleteFailed"));
    },
  });
};