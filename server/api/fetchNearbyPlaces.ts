import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Google Places API 응답에서 필요한 데이터의 타입을 정의합니다.
// (필요에 따라 name, vicinity 등 다른 속성을 추가할 수 있습니다.)
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

// Google Places API의 전체 응답 타입을 정의합니다.
interface GoogleApiResponse {
  results: Place[];
}

// 구글 Places API를 호출하여 주변 장소 정보를 가져오는 서비스 함수
const fetchNearbyPlaces = async (
  lat: string,
  lng: string
): Promise<Place[]> => {
  try {
    // axios.get에 제네릭으로 응답 타입을 지정해줍니다.
    const response = await axios.get<GoogleApiResponse>(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: `${lat},${lng}`,
          radius: 15000, // 15km 반경
          type: "tourist_attraction", // 관광 명소 타입
          language: "ko", // 한국어 결과
          key: process.env.GOOGLE_MAP_API_KEY, // .env 파일의 API 키
        },
      }
    );
    // 실제 데이터가 담긴 results 배열을 반환 (결과가 없으면 빈 배열이 반환됩니다)
    return response.data.results;
  } catch (error) {
    // 에러가 발생하면 콘솔에 기록하고, 에러를 던져서 컨트롤러가 처리하도록 함
    console.error("Error fetching from Google Maps API:", error);
    throw new Error("Failed to fetch data from Google API");
  }
};

export { fetchNearbyPlaces };
