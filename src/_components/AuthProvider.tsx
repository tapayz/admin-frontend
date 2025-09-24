"use client";

import { useMyInfoQuery } from "@/_commomActions/myInfo/react-query/useMyInfoQuery";
import { useLogoutMutation } from "@/_layouts/auth/_hooks/react-query/useLogoutMutation";
import { useSessionStore } from "@/_stores/useSessionStore";
import React, { useEffect } from "react";
import Loader from "./Loader/Loader";

type Props = {
	children: React.ReactNode[] | React.ReactNode;
};

function AuthProvider({ children }: Props) {
	const { session, setSession } = useSessionStore();
	const { data: myInfoData, isLoading, isError } = useMyInfoQuery();
	const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();

	useEffect(() => {
		const sessionItem = localStorage.getItem("session");

		if (myInfoData && !session) {
			setSession(myInfoData);
		}

		// 로그아웃 중이 아닐 때만 로그아웃 호출 (무한 루프 방지)
		if ((!sessionItem || isError) && !isLoggingOut) {
			logout();
		}
	}, [myInfoData, isError, session, isLoggingOut, logout]);

	if (isLoading || isLoggingOut) return <Loader />;

	return <>{children}</>;
}

export default AuthProvider;
