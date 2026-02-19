import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import type { coordinates } from "../../types/coordinatestype";

//나중에 경로 지정할 때 마커 분리 생각하기

export type MyMapProps = {
  place?: coordinates; //지도 중간 위치
  children?: React.ReactNode;
};

const MyMap = ({ place, children }: MyMapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP, // ✅ 환경변수에서 키 불러오기
  });

  if (!isLoaded) {
    return <div>Loading Map...</div>; // 스크립트 로딩 전엔 google 객체 없음
  }
  const defaultCoords: coordinates = { lat: 37.5665, lng: 126.989 };
  const mapCenter = place ?? defaultCoords; //지도 기본 위치 지정
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={mapCenter}
      zoom={13}
    >
      {children}
    </GoogleMap>
  );
};

export default MyMap;
