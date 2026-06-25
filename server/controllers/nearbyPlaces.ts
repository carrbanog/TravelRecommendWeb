import { Request, Response } from "express";
import axios from "axios"; // 백엔드에서 구글 API를 호출하기 위해 필요
import { fetchNearbyPlaces } from "../api/fetchNearbyPlaces";
import { GooglePlaceObject } from "../type";

const getNearbyPlaces = async (req: Request, res: Response) => {
  // 1. 이제 프론트에서는 lat, lng 대신 query(주소)를 보냅니다.
  const { query, type } = req.query;
  console.log("서버", query, type);
  if (!query || !type) {
    return res
      .status(400)
      .json({ message: "Query(address) and type are required." });
  }

  try {
    // 2. 백엔드에서 먼저 구글 지오코딩 API를 호출합니다.
    const geocodeRes = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: String(query),
          key: process.env.GOOGLE_MAP_API_KEY, // 백엔드의 .env 환경변수 사용 권장
        },
      },
    );

    const { status, results } = geocodeRes.data;
    console.log("좌표 반환", status, results);
    if (status === "ZERO_RESULTS" || !results || results.length === 0) {
      return res.status(404).json({
        message: "검색 결과가 존재하지 않습니다. 정확한 주소를 입력해주세요.",
      });
    }

    // 3. 지오코딩 결과에서 좌표(lat, lng)를 추출합니다.
    const { lat, lng } = results[0].geometry.location;

    // 4. 추출한 좌표로 기존의 주변 장소 검색 함수를 실행합니다.
    const rawPlaces = await fetchNearbyPlaces(
      String(lat),
      String(lng),
      String(type),
    );

    const refinedResults = (rawPlaces || []).map(
      (place: GooglePlaceObject) => ({
        title: place.name || "이름 없는 장소",
        nearCoordinates: place.geometry?.location || { lat: 0, lng: 0 },
        placeId: place.place_id || `unknown-${Math.random()}`,
        type: String(type),
      }),
    );

    res.status(200).json({
      type,
      location: { lat, lng },
      results: refinedResults,
    });
  } catch (error) {
    console.error("🚨 통합 검색 중 에러 발생:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export { getNearbyPlaces };
