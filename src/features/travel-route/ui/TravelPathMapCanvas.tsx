import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { useSelectedPlacesStore } from "@/entities/place/model/selectedPlacesStore";
import { usePlaceDetailsQuery } from "@/entities/place/place-details/lib/usePlaceDetailsQuery";
import { PlaceInfoWindow } from "@/entities/place/place-details/ui/PlaceInfoWindow";
import MyMap from "@/shared/ui/GoogleMap/MyMap";
import { DayRoutePolyline } from "@/features/travel-route/ui/DayRoutePolyline";
import type { PlanPlace } from "@/entities/place/model/type";
import type { DayRouteData } from "@/features/calculate-distance/model/type";

type Props = {
  activeTab: number;
  colors: string[];
  hoveredPlace: string | null;
  onPlaceHover: (placeId: string) => void;
  onPlaceLeave: () => void;
  dayIndex: number | undefined;
  places: PlanPlace[] | undefined;
  routeData: DayRouteData | undefined;
};

// 사용자가 여행지 일정을 선택 후 경로를 보여주는 지도 컴포넌트
export const TravelPathMapCanvas = React.memo(
  ({
    activeTab,
    colors,
    hoveredPlace,
    onPlaceHover,
    onPlaceLeave,
    dayIndex,
    places,
    routeData,
  }: Props) => {
    const center = useSelectedPlacesStore((s) => s.center);

    // 💡 상세 데이터 가져오는 쿼리 (기존 유지)
    const { data: detailData, isLoading: detailLoading } = usePlaceDetailsQuery(
      hoveredPlace || "",
    );

    // 해당 날짜 탭의 고유 색상 추출
    const mapColor = colors[activeTab % colors.length] || "#007BFF";

    return (
      <MyMap place={center} zoom={13}>
        {places?.map((place, idx) => (
          <Marker
            key={place.id}
            position={place.nearCoordinates}
            title={place.title}
            label={{
              text: String(idx + 1),
              fontWeight: "bold",
              color: "#ffffff",
            }}
            onMouseOver={() => onPlaceHover(place.id)}
            onMouseOut={onPlaceLeave}
          >
            {hoveredPlace === place.id && detailData && (
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

        {dayIndex !== undefined && routeData && (
          <DayRoutePolyline
            dayPlanId={dayIndex}
            places={places}
            color={mapColor}
            routeData={routeData}
          />
        )}
      </MyMap>
    );
  },
);
