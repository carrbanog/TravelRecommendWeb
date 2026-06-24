import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import type { coordinates } from "../../types/coordinatestype";

//나중에 경로 지정할 때 마커 분리 생각하기

export type MyMapProps = {
  place?: coordinates; //지도 중간 위치
  zoom?: number; //지도 확대 비율
  children?: React.ReactNode;
};

const MyMap = ({ place, zoom, children }: MyMapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP, // ✅ 환경변수에서 키 불러오기
  });

  const mapOptions = {
    minZoom: 2, // 너무 작게 축소되지 않도록 설정 (세계 지도가 한 화면에 들어오는 정도)
    restriction: {
      latLngBounds: {
        north: 85,
        south: -85,
        west: -180,
        east: 180,
      },
      strictBounds: false, // true로 설정하면 화면을 넘어가는 드래그를 완전히 막습니다.
    },
  };
  if (!isLoaded) {
    return <div>Loading Map...</div>; // 스크립트 로딩 전엔 google 객체 없음
  }
  const defaultCoords: coordinates = { lat: 37.5665, lng: 126.989 };
  const mapCenter = place ?? defaultCoords; //지도 기본 위치 지정
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={mapCenter}
      zoom={zoom ?? 10}
      options={mapOptions}
    >
      {children}
    </GoogleMap>
  );
};

export default MyMap;
