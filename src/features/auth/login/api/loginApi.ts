import type { LoginResponse } from "../../login/model/type";
import type { LoginData } from "../../../../shared/types/usertype";
import api from "../../../../shared/api/axiosInstance";
import { AUTH_ENDPOINTS } from "../../../../shared/api/endpoints";
import { apiClient } from "../../../../shared/api/apiClient";

// export const loginApi = async (data: LoginData): Promise<LoginResponse> => {
//   const response = await api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, data);
//   console.log(response);
//   return response.data;
// };

export const loginApi = async (data: LoginData): Promise<LoginResponse> => {
  const res = await apiClient.post<LoginData, LoginResponse>(
    AUTH_ENDPOINTS.LOGIN,
    data
  );
  return res;
};
