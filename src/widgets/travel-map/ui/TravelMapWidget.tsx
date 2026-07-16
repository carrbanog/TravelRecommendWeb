import React, { useEffect } from "react";
import { InfoWindow, Marker } from "@react-google-maps/api";

// [Entities Layer]
import { useSelectedPlacesStore } from "@/entities/place/model/selectedPlacesStore";
import { usePlaceDetailsQuery } from "@/entities/place/place-details/lib/usePlaceDetailsQuery";
import { PlaceInfoWindow } from "@/entities/place/place-details/ui/PlaceInfoWindow";

// [Shared Layer]
import MyMap from "@/shared/ui/GoogleMap/MyMap";
import { MapSkeleton } from "@/shared/ui/GoogleMap/MapSkeleton";
import { useMapHover } from "@/shared/lib/hooks/useMapHover";
import type { NearPlace } from "@/shared/types/nearPlaceType";

type TravelMapWidgetProps = {
  places?: NearPlace[];
  isLoading: boolean;
};

const TravelMapWidget = React.memo(
  ({ places, isLoading }: TravelMapWidgetProps) => {
    const center = useSelectedPlacesStore((s) => s.center);
    const setCenter = useSelectedPlacesStore((s) => s.setCenter);
    const addPlace = useSelectedPlacesStore((s) => s.addPlace);
    const { hoveredPlace, handleMouseOver, handleMouseOut } = useMapHover(400);
    const { data: detailData, isLoading: detailLoading } = usePlaceDetailsQuery(
      hoveredPlace || ""
    );

    // 지도 중앙값
    useEffect(() => {
      if (places && places.length > 0) {
        const firstPlaceCoordinates = places[0].nearCoordinates;
        if (firstPlaceCoordinates) {
          setCenter(firstPlaceCoordinates);
        }
      }
    }, [places, setCenter]);

    if (isLoading) {
      return <MapSkeleton />;
    }

    return (
      <MyMap place={center} zoom={12}>
        {places?.map((placeItem) => (
          <Marker
            key={placeItem.placeId}
            position={placeItem.nearCoordinates}
            onClick={() => addPlace(placeItem)}
            onMouseOver={() => handleMouseOver(placeItem.placeId)}
            onMouseOut={handleMouseOut}
          >
            {/* 현재 호버된 마커와 이 마커의 데이터가 일치할 때만 InfoWindow 표시 */}
            {hoveredPlace === placeItem.placeId && detailData && (
              <InfoWindow options={{ disableAutoPan: true }}>
                {detailLoading ? (
                  <div className="p-2 text-xs text-slate-500">
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
  }
);

TravelMapWidget.displayName = "TravelMapWidget";
export default TravelMapWidget;