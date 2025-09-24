import { useMutation } from "@tanstack/react-query";
import { useSessionStore } from "@/_stores/useSessionStore";
import { useLocale } from "@/_hooks/useLocale";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useLogoutMutation = () => {
	const { setSession } = useSessionStore();
	const { t } = useLocale();
	const router = useRouter();

	return useMutation({
		mutationFn: async () => {
			// 서버 API 호출 없이 클라이언트에서만 로그아웃 처리
			return "로그아웃 되었습니다.";
		},
		onSuccess: (message) => {
			// 로컬 상태 정리
			setSession(null);
			localStorage.removeItem('session');

			// 쿠키 삭제
			document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

			// 성공 메시지 표시
			toast.success(message || t("logout.success"));

			// 로그인 페이지로 이동
			router.push("/signin");
		},
		onError: (error) => {
			console.error("Logout error:", error);
			toast.error(t("logout.failed"));
		},
	});
};
