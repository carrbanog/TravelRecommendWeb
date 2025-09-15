import type { LoginResponse } from "../../login/model/type";
import type { LoginData } from "../../../../shared/types/user";
import api from "../../../../shared/api/axiosInstance";
import { AUTH_ENDPOINTS } from "../../../../shared/api/endpoints";

export const loginApi = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, data);
  console.log(response);
  return response.data;
};
