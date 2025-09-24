import { useMutation } from "@tanstack/react-query";
import { logout } from "../../_actions/logout";
import { useSessionStore } from "@/_stores/useSessionStore";
import { useLocale } from "@/_hooks/useLocale";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useLogoutMutation = () => {
  const { setSession } = useSessionStore();
  const { t } = useLocale();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: (message) => {
      // 로컬 상태 정리
      setSession(null);
      localStorage.removeItem('signinTime');
      localStorage.removeItem('session');

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
