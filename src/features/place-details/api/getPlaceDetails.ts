import axios from 'axios';
import type { PlaceDetailResponse } from '../model/types';
import { apiClient } from '@/shared/api/apiClient';

// 마우스를 올리면 세부 정보를 보여주는 API
export const getPlaceDetails = async (placeId: string): Promise<PlaceDetailResponse | null> => {
  try{
    const res = await apiClient.get<PlaceDetailResponse>(`/placeDetails`, {
      params: { placeId }
    });
    console.log("Response from getPlaceDetails API:", res);
    return res;
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
};
