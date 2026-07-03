import axios from "axios";
import type { AddressType, SearchType } from "../model/type";
import type { NearPlaceApiResponse } from "../model/type";
import { AUTH_ENDPOINTS } from "../../../shared/api/endpoints";
import { apiClient } from "../../../shared/api/apiClient";
import { handleApiError } from "../../../shared/api/apiClient";

// 도시이름, 좌표 반환
export const fetchMapCode = async (
  address: string,
): Promise<AddressType | undefined> => {
  if (!address || !address.trim()) {
    throw new Error("검색할 주소가 입력되지 않았습니다.");
  }

  try {
    const res = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address,
          key: import.meta.env.VITE_GOOGLE_MAP,
        },
      },
    );
    const { status, results } = res.data;

    if (status === "ZERO_RESULTS" || !results || results.length === 0) {
      throw new Error(
        "검색 결과가 존재하지 않습니다. 정확한 주소를 입력해주세요.",
      );
    }

    return results[0];
  } catch (error: any) {
    console.error("🚨 fetchMapCode 실행 중 에러 발생:", error);
    return handleApiError(error);
  }
};

export const fetchNearbyPlaces = async (
  query: string,
  type: SearchType,
): Promise<NearPlaceApiResponse> => {
  if (!query || !query.trim()) {
    return { type, location: null, results: [] };
  }

  try {
    const res = await apiClient.get<NearPlaceApiResponse>(
      AUTH_ENDPOINTS.NEARBYPLACES,
      {
        params: { query, type },
      },
    );
    console.log("서버 요청", res);
    if (!Array.isArray(res?.results)) {
      console.error("🚨 서버 응답의 results 포맷이 올바르지 않습니다:", res);
      return {
        type: res?.type || "",
        location: res?.location || null,
        results: [],
      };
    }
    return res;
  } catch (error: any) {
    console.error("🚨 fetchNearbyPlaces 실행 중 에러 발생:", error);
    throw error;
  }
};
