import React from "react";
import { Marker, Polyline, InfoWindow } from "@react-google-maps/api";
import { useSelectedPlacesStore } from "@/entities/place/model/selectedPlacesStore";
import { usePlaceDetailsQuery } from "@/entities/place/place-details/lib/usePlaceDetailsQuery";
import { useMapHover } from "@/shared/lib/hooks/useMapHover";
import { PlaceInfoWindow } from "@/entities/place/place-details/ui/PlaceInfoWindow";
import MyMap from "@/shared/ui/GoogleMap/MyMap";
import type { coordinates } from "@/shared/types/coordinatestype";

type Props = {
  activeTab: number;
  roadPath?: coordinates[];
  colors: string[];
};

// 사용자가 여행지 일정을 선택 후 경로를 보여주는 지도 컴포넌트
export const TravelPathMapCanvas = React.memo(({ activeTab, roadPath, colors }: Props) => {
  const center = useSelectedPlacesStore((s) => s.center);
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const { hoveredPlace, handleMouseOver, handleMouseOut } = useMapHover(400);
  const { data: detailData, isLoading: detailLoading } = usePlaceDetailsQuery(hoveredPlace || "");
  console.log("TravelPathMapCanvas 렌더링", "activeTab:", activeTab, "roadPath:", roadPath, "colors:", colors)
  return (
    <MyMap place={center} zoom={13}>
      {selectedPlaces.map((place) => (
        <Marker
          key={place.placeId}
          position={place.nearCoordinates}
          title={place.title}
          onMouseOver={() => handleMouseOver(place.placeId)}
          onMouseOut={handleMouseOut}
        >
          {hoveredPlace === place.placeId && detailData && (
            <InfoWindow options={{ disableAutoPan: true }}>
              {detailLoading ? (
                <div className="p-2 text-xs">로딩 중...</div>
              ) : (
                <PlaceInfoWindow place={detailData} />
              )}
            </InfoWindow>
          )}
        </Marker>
      ))}

      {roadPath && (
        <Polyline
          path={roadPath}
          options={{
            strokeColor: colors[activeTab % colors.length],
            strokeWeight: 5,
            strokeOpacity: 0.8,
          }}
        />
      )}
    </MyMap>
  );
});