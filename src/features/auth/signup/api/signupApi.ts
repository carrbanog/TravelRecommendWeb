import type { SignupResponse } from "../../signup/model/type";
import type { UserData } from "../../../../shared/types/usertype";
import { AUTH_ENDPOINTS } from "../../../../shared/api/endpoints";
import { apiClient } from '@/shared/api/apiClient';

export const signUp = async (data: UserData): Promise<SignupResponse> => {
  const response = await apiClient.post<UserData, SignupResponse>(AUTH_ENDPOINTS.SIGNUP, data);
  console.log(response);
  return response;
};
