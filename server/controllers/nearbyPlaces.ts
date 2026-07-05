import { Request, Response } from "express";
import axios from "axios"; // 백엔드에서 구글 API를 호출하기 위해 필요
// import { fetchNearbyPlaces } from "../api/fetchNearbyPlaces";
import { GooglePlaceObject } from "../type";

const refinePlaceResults = (rawPlaces: GooglePlaceObject[], defaultType: string) => {
  return (rawPlaces || []).map((place: GooglePlaceObject) => ({
    title: place.name || "이름 없는 장소",
    nearCoordinates: place.geometry?.location || { lat: 0, lng: 0 },
    placeId: place.place_id || `unknown-${Math.random()}`,
    type: defaultType, // 프론트에서 구별하기 편하도록 원래 타입 명시 ('place' | 'hotel')
  }));
};

const getNearbyPlaces = async (req: Request, res: Response) => {
  // 1️⃣ 프론트엔드 리팩토링에 맞춰 이제 type은 받지 않고 query(주소)만 필수값으로 체크합니다.
  const { query } = req.query;
  console.log("서버 통합 검색 요청 주소:", query);

  if (!query) {
    return res
      .status(400)
      .json({ message: "Query(address) is required." });
  }

  try {
    // 2️⃣ 구글 지오코딩 API 호출 (주소 -> 좌표 변환)
    const geocodeRes = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: String(query),
          key: process.env.GOOGLE_MAP_API_KEY,
        },
      },
    );

    const { status, results } = geocodeRes.data;
    console.log("좌표 반환 상태:", status);

    if (status === "ZERO_RESULTS" || !results || results.length === 0) {
      return res.status(404).json({
        message: "검색 결과가 존재하지 않습니다. 정확한 주소를 입력해주세요.",
      });
    }

    // 3️⃣ 위도, 경도 추출
    const { lat, lng } = results[0].geometry.location;

    // 4️⃣ ⚡ 핵심: 여행지와 호텔 데이터를 Promise.all로 "동시에" 병렬 호출합니다.
    // 두 API 요청이 동시에 날아가므로 순차적으로 보낼 때보다 속도가 훨씬 빠릅니다.
    const [rawPlaces, rawHotels] = await Promise.all([
      fetchNearbyPlaces(String(lat), String(lng), "tourist_attraction"),
      fetchNearbyPlaces(String(lat), String(lng), "lodging")
    ]);

    // 5️⃣ 각각의 데이터를 프론트 포맷에 맞게 정제
    const refinedPlaces = refinePlaceResults(rawPlaces, "place");
    const refinedHotels = refinePlaceResults(rawHotels, "hotel");

    // 6️⃣ 프론트엔드가 요구하는 구조(location, places, hotels)로 한 번에 응답!
    res.status(200).json({
      location: { lat, lng },
      places: refinedPlaces,
      hotels: refinedHotels,
    });

  } catch (error) {
    console.error("🚨 서버 통합 검색 중 에러 발생:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

// 구글 Nearby Search API 전용 공통 유틸 함수로 변경 (내부 매핑 로직 제거)
const fetchNearbyPlaces = async (
  lat: string,
  lng: string,
  googleType: "tourist_attraction" | "lodging"
): Promise<any[]> => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: `${lat},${lng}`,
          radius: 10000, // 10km 반경 동일 설정
          type: googleType,
          language: "ko",
          key: process.env.GOOGLE_MAP_API_KEY,
        },
      }
    );
    return response.data.results || [];
  } catch (error) {
    console.error(`Error fetching ${googleType} from Google Maps API:`, error);
    throw new Error("Failed to fetch data from Google API");
  }
};

export { getNearbyPlaces, fetchNearbyPlaces };