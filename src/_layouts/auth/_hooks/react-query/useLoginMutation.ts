import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { login } from "../../_actions/login";
import { LoginRequestDto } from "../../_dtos/loginRequest.dto";
import toast from "react-hot-toast";
import { useLocale } from "@/_hooks/useLocale";
import { useSessionStore } from "@/_stores/useSessionStore";
import { useRouter } from "next/navigation";
import dayjs from 'dayjs';

export const useLoginMutation = () => {
  const router = useRouter();
  const { t } = useLocale();
  return useMutation({
    mutationFn: ({ id, password: pw, provider }: LoginRequestDto) =>
      login({ id, password: pw, provider }),
    onSuccess: () => {
      router.replace("/dashboard");
		localStorage.setItem('session', dayjs(new Date()).format("YYYY-MM-DD (HH:mm:ss)"));
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error(error);
      if (error.message === "401") {
        toast.error(t("signin.error.idOrPassword"));
      } else {
        toast.error(error.response?.data.message ?? "Failed to sign in");
      }
    },
  });
};
