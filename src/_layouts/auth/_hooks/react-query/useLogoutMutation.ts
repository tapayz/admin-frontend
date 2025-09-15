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
    onSuccess: () => {
      setSession(null);
      toast.success(t("logout.success"));
      router.push("/signin");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      toast.error(t("logout.failed"));
    },
  });
};
