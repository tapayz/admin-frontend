import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePartnerInfo } from "../../_actions/updatePartnerInfo";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { myInfoOptions } from "@/_commomActions/myInfo/react-query/useMyInfoQuery";
import { useTableColumnStore } from "@/_layouts/invoice/_store/useTableColumnStore";

export const usePartnerInfoUpdateMutation = () => {
  const { setId } = useTableColumnStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePartnerInfo,
    onSuccess: () => {
      setId("");
      toast.success("Partner info updated successfully");
      queryClient.invalidateQueries({ queryKey: myInfoOptions.queryKey });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data.message ?? "Failed to update partner info"
      );
    },
  });
};
