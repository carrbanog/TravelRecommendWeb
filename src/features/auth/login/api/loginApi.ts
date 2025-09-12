import type { loginData, LoginResponse } from "../../login/model/type";
import api from "../../../../shared/api/axiosInstance";
import { AUTH_ENDPOINTS } from "../../../../shared/api/endpoints";

export const loginApi = async (data: loginData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, data);
  console.log(response);
  return response.data;
};
