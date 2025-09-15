import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export const TravelMap: React.FC = () => {
  console.log(MAPBOX_TOKEN);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!MAPBOX_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    // 지도 초기화
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11", // Mapbox 스타일
      center: [139.767125, 35.681236], // 도쿄역 예시 (lon, lat)
      zoom: 12,
    });

    // 줌/이동 컨트롤
    mapRef.current.addControl(new mapboxgl.NavigationControl());

    return () => mapRef.current?.remove();
  }, []);

  return <div ref={mapContainer} style={{ height: "100vh", width: "100%" }} />;
};

export default TravelMap;
