// 이 파일서 모든 get, post요청을 관리합니다.
import api from "./axiosInstance";
import axios, { Axios, AxiosError } from "axios";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
import { data } from "react-router-dom";

const handleApiError = (error: AxiosError | Error) => {
  if (axios.isAxiosError(error)) {
    console.error("API Client Error:", error.response?.data || error.message);
  } else {
    console.error("Unexpected Error:", error.message);
  }
  throw error;
};

export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await api.get<T>(url, config);
      console.log("get요청", response);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError | Error);
      throw error;
    }
  },

  post: async <TRequest, TResponse>(
    url: string,
    data: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> => {
    try {
      const response = await api.post<TResponse>(url, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError | Error);
      throw error;
    }
  },
};
