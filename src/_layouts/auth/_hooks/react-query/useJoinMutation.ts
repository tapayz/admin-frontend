import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { join } from "../../_actions/join";
import { JoinRequestDto } from "../../_dtos/joinRequest.dto";
import toast from "react-hot-toast";
import { useLocale } from "@/_hooks/useLocale";

export const useJoinMutation = () => {
  const { t } = useLocale();

  return useMutation({
    mutationFn: (data: JoinRequestDto) => join(data),
    onSuccess: () => {
      toast.success(t("signup.success"));
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || t("signup.failed"));
    },
  });
};