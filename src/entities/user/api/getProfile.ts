import axios from 'axios';
import api from "../../../shared/api/axiosInstance";
import type { ProfileData } from '../../../shared/types/usertype';
import { AUTH_ENDPOINTS } from '../../../shared/api/endpoints';

export const getProfile = async (): Promise<ProfileData> => {
  const {data} = await api.get<ProfileData>(AUTH_ENDPOINTS.PROFILE);
  console.log(data);
  return data;  
}