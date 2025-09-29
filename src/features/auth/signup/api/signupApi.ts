import type { SignupResponse } from "../../signup/model/type";
import type { UserData } from "../../../../shared/types/usertype";
import api from "../../../../shared/api/axiosInstance";
import { AUTH_ENDPOINTS } from "../../../../shared/api/endpoints";

export const signUp = async (data: UserData): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>(AUTH_ENDPOINTS.SIGNUP, data);
  console.log(response);
  return response.data;
};
