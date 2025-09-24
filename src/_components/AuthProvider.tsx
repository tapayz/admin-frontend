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
	const { data: myInfoData, isLoading, isError, refetch } = useMyInfoQuery();
	const { mutate: logout } = useLogoutMutation();

	useEffect(() => {
		const sessionItem = localStorage.getItem("session");
		if (sessionItem && !session) {
			refetch();
		}
	}, []);

	useEffect(() => {
		if (myInfoData && !session) {
			setSession(myInfoData);
		}
	}, [myInfoData, session, setSession]);

	useEffect(() => {
		const sessionItem = localStorage.getItem("session");
		if (isError || !sessionItem) {
			logout();
		}
	}, [isError, logout]);

	if (isLoading) return <Loader />;

	return <>{children}</>;
}

export default AuthProvider;
