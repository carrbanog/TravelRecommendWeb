import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

interface Place {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  vicinity: string;
}

interface GoogleApiResponse {
  results: Place[];
}

// 프론트에서 전달되는 type을 기반으로 Google API 요청 시 type을 지정
const fetchNearbyPlaces = async (
  lat: string,
  lng: string,
  type: string
): Promise<Place[]> => {
  try {
    // 클라이언트에서 오는 type 값에 따라 구글맵 type 매핑
    const googleTypeMap: Record<string, string> = {
      place: "tourist_attraction",
      hotel: "lodging",
    };

    // 유효하지 않은 type이면 기본값 'tourist_attraction'
    const mappedType = googleTypeMap[type] || "tourist_attraction";

    const response = await axios.get<GoogleApiResponse>(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: `${lat},${lng}`,
          radius: 15000,
          type: mappedType,
          language: "ko",
          key: process.env.GOOGLE_MAP_API_KEY,
        },
      }
    );
    // console.log(response.data.results)
    return response.data.results;
    
  } catch (error) {
    console.error("Error fetching from Google Maps API:", error);
    throw new Error("Failed to fetch data from Google API");
  }
};

export { fetchNearbyPlaces };
