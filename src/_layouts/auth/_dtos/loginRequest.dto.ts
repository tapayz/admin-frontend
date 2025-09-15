import { Provider } from "./provider.enum";

export interface LoginRequestDto {
  id: string;
  password: string;
  provider?: Provider;
}