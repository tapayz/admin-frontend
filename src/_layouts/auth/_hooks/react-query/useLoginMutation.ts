import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { login } from "../../_actions/login";
import { LoginRequestDto } from "../../_dtos/loginRequest.dto";
import toast from "react-hot-toast";
import { useLocale } from "@/_hooks/useLocale";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { myInfoOptions } from "@/_commomActions/myInfo/react-query/useMyInfoQuery";

export const useLoginMutation = () => {
	const router = useRouter();
	const { t } = useLocale();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, password: pw, provider }: LoginRequestDto) =>
			login({ id, password: pw, provider }),
		onSuccess: () => {
			localStorage.setItem(
				"session",
				dayjs(new Date()).format("YYYY-MM-DD (HH:mm:ss)")
			);
			queryClient.invalidateQueries({ queryKey: myInfoOptions.queryKey });
			router.push("/dashboard");
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
