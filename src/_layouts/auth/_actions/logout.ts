import { client } from "@/_service/axios";

export const logout = async (): Promise<string> => {
	try {
		// window.location.href = `${process.env.NEXT_PUBLIC_API_URL || ''}/auth/logout`;
		const res = await client.get<{ message: string }>("/auth/logout");
		return res.data.message || "로그아웃 되었습니다.";
	} catch (error) {
		console.error(error);
		throw error;
	}
};