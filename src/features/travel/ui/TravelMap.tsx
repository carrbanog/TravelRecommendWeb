import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useQuery } from "@tanstack/react-query";
import { fetchPlaceCoordinates } from "../api/geocode";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface TravelMapProps {
  searchTerm?: string;
  onSelectPlace?: (place: {
    name: string;
    coordinates: [number, number];
  }) => void;
  selectedPlace: { name: string; coordinates: [number, number] }[];
}

const TravelMap: React.FC<TravelMapProps> = ({
  searchTerm,
  onSelectPlace,
  selectedPlace,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  // 지도 초기화
  useEffect(() => {
    if (!MAPBOX_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [139.767125, 35.681236], // 기본 위치: 도쿄역
      zoom: 9,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    mapRef.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;

      const newPlace = {
        name: "사용자 위치 선택",
        coordinates: [lng, lat] as [number, number],
      };

      markerRef.current = new mapboxgl.Marker({ color: "red" })
        .setLngLat([lng, lat])
        .addTo(mapRef.current!);

      markerRef.current.getElement().addEventListener("click", () => {
        if (onSelectPlace) {
          onSelectPlace({
            name: "사용자 위치 선택",
            coordinates: [lng, lat],
          });
        }
      });
    });

    return () => mapRef.current?.remove();
  }, []);

  // React Query로 좌표 가져오기
  const { data } = useQuery({
    queryKey: ["geocode", searchTerm],
    queryFn: () => fetchPlaceCoordinates(searchTerm ?? ""),
    enabled: !!searchTerm, // searchTerm이 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  // 좌표가 바뀌면 지도 이동 + 마커
  useEffect(() => {
    if (!data || !mapRef.current) return;

    const [lon, lat] = data.center;
    // const placeName = data.place_name;

    mapRef.current.flyTo({ center: [lon, lat], zoom: 15 });
  }, [data]);

  useEffect(() => {
    if (!mapRef.current) return;

    const savedPlaces = localStorage.getItem("selectedPlace");
    if (!savedPlaces) return;

    const places: { name: string; coordinates: [number, number] }[] =
      JSON.parse(savedPlaces);

    places.forEach((place) => {
      const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat(place.coordinates)
        .setPopup(new mapboxgl.Popup().setText(place.name))
        .addTo(mapRef.current!);

      marker.getElement().addEventListener("click", () => {
        if (onSelectPlace) {
          onSelectPlace(place);
        }
      });
    });
    if (places.length > 0) {
      mapRef.current.flyTo({ center: places[0].coordinates, zoom: 5 });
    }
  }, []);

  return <div ref={mapContainer} style={{ height: "100vh", width: "100%" }} />;
};

export default TravelMap;
