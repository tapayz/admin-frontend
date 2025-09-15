import { client } from "@/_service/axios";
import { LoginRequestDto } from "../_dtos/loginRequest.dto";
import { LoginResponseDto } from "../_dtos/loginResponse.dto";

export const login = async (data: LoginRequestDto): Promise<LoginResponseDto> => {
  try {
    const res = await client.post<LoginResponseDto>("/auth/login", data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};