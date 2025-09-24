"use client";

import { useMyInfoQuery } from "@/_commomActions/myInfo/react-query/useMyInfoQuery";
import { useSessionStore } from "@/_stores/useSessionStore";
import React, { useEffect } from "react";
import Loader from "./Loader/Loader";

type Props = {
	children: React.ReactNode[] | React.ReactNode;
};

function AuthProvider({ children }: Props) {
	const { session, setSession } = useSessionStore();
	const { data: myInfoData, isLoading } = useMyInfoQuery();

	useEffect(() => {
		if (myInfoData && !session) {
			setSession(myInfoData);
		}
	}, [myInfoData, session, setSession]);

	if (isLoading) return <Loader />;

	return <>{children}</>;
}

export default AuthProvider;
