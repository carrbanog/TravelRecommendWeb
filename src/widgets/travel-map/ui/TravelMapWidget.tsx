import React, { useState } from "react"; // useState 추가
import { InfoWindow, Marker } from "@react-google-maps/api"; // InfoWindow 추가
import MyMap from "../../../shared/ui/GoogleMap/MyMap";
import type { coordinates } from "../../../shared/types/coordinatestype";
import type { NearPlace } from "../../../shared/types/nearPlaceType";
import { PlaceInfoWindow } from "@/entities/place/ui/PlaceInfoWindow";

type Props = {
  centerCoords?: coordinates;
  onMarkerClick: (place: NearPlace) => void;
  places?: NearPlace[];
  isLoading: boolean;
};

export const TravelMapWidget = React.memo(
  ({ centerCoords, onMarkerClick, places, isLoading }: Props) => {
    // 현재 마우스가 올라간 장소를 관리하는 상태
    console.log(places, "places in TravelMapWidget");
    const [hoveredPlace, setHoveredPlace] = useState<NearPlace | null>(null);

    if (isLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-lg">
          지도 로딩 중...
        </div>
      );
    }

    return (
      <MyMap place={centerCoords}>
        {places?.map((placeItem, idx) => (
          <Marker
            key={idx}
            position={placeItem.nearCoordinates}
            onClick={() => onMarkerClick(placeItem)}
            // 마우스 오버 시 상태 업데이트
            onMouseOver={() => setHoveredPlace(placeItem)}
            // 마우스 아웃 시 상태 초기화
            onMouseOut={() => setHoveredPlace(null)}
          >
            {/* 현재 호버된 마커와 이 마커의 데이터가 일치할 때만 InfoWindow 표시 */}
            {hoveredPlace === placeItem && (
              <InfoWindow>
                <PlaceInfoWindow place={placeItem} />
              </InfoWindow>
            )}
          </Marker>
        ))}
      </MyMap>
    );
  },
);
