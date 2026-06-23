// 이 파일서 모든 get, post요청을 관리합니다.
import api from "./axiosInstance";
import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";

export const handleApiError = (error: AxiosError | Error) => {
  // 1. 기본 메시지 세팅
  let errorMessage =
    "서버 요청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

  // 2. 만약 백엔드 통신 중 터진 'Axios 에러'라면?
  if (axios.isAxiosError(error)) {
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
    } else if (error.request) {
      errorMessage =
        "서버와 연결할 수 없습니다. 인터넷 연결 상태를 확인해주세요.";
    }
    console.error("[Axios API Error]:", errorMessage);
  }

  // 3. 만약 커스텀 에러(프론트에서 직접 던진 에러)라면?
  else if (error instanceof Error && !axios.isAxiosError(error)) {
    errorMessage = error.message;
    console.error("[Custom Error]:", errorMessage);
  }

  // 4. 최종적으로 정제된 메시지를 주머니에 주입하고 위로 토스!
  (error as any).customMessage = errorMessage;
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
    config?: AxiosRequestConfig,
  ): Promise<TResponse> => {
    try {
      const response = await api.post<TResponse>(url, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError | Error);
      throw error;
    }
  },

  delete: async <TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> => {
    try {
      const response = await api.delete<TResponse>(url, config);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError | Error);
      throw error;
    }
  },
};
