import React, { useState, useRef } from "react"; // useState 추가
import { InfoWindow, Marker } from "@react-google-maps/api"; // InfoWindow 추가
import MyMap from "../../../shared/ui/GoogleMap/MyMap";
import type { coordinates } from "../../../shared/types/coordinatestype";
import type { NearPlace } from "../../../shared/types/nearPlaceType";
import { PlaceInfoWindow } from "@/entities/place/ui/PlaceInfoWindow";
import { usePlaceDetailsQuery } from "@/features/place-details/lib/usePlaceDetailsQuery";

import { useMapHover } from "../../../shared/lib/hooks/useMapHover";

type Props = {
  centerCoords?: coordinates;
  onMarkerClick: (place: NearPlace) => void;
  places?: NearPlace[];
  isLoading: boolean;
};

export const TravelMapWidget = React.memo(
  ({ centerCoords, onMarkerClick, places, isLoading }: Props) => {
    const { hoveredPlace, handleMouseOver, handleMouseOut } = useMapHover(400);

    const { data: detailData, isLoading: detailLoading } = usePlaceDetailsQuery(
      hoveredPlace?.placeId || "",
    );

    if (isLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-lg">
          지도 로딩 중...
        </div>
      );
    }

    return (
      <MyMap place={centerCoords}>
        {places?.map((placeItem) => (
          <Marker
            key={placeItem.placeId}
            position={placeItem.nearCoordinates}
            onClick={() => onMarkerClick(placeItem)}
            // 마우스 오버 시 상태 업데이트
            onMouseOver={() => handleMouseOver(placeItem)}
            // 마우스 아웃 시 상태 초기화
            onMouseOut={handleMouseOut}
          >
            {/* 현재 호버된 마커와 이 마커의 데이터가 일치할 때만 InfoWindow 표시 */}
            {hoveredPlace?.placeId === placeItem.placeId && detailData && (
              <InfoWindow>
                {detailLoading ? (
                  <div style={{ padding: "8px", fontSize: "12px" }}>
                    로딩 중...
                  </div>
                ) : (
                  <PlaceInfoWindow place={detailData} />
                )}
              </InfoWindow>
            )}
          </Marker>
        ))}
      </MyMap>
    );
  },
);
