import { client } from "@/_service/axios";

export const logout = async (): Promise<string> => {
  try {
    const res = await client.post<{ message: string }>("/auth/logout");
    return res.data.message || "로그아웃 되었습니다.";
  } catch (error) {
    console.error(error);
    throw error;
  }
};