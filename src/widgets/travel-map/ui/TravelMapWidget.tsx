import React, { useEffect } from "react";
// 1. MarkerClusterer 컴포넌트를 추가로 임포트합니다.
import { InfoWindow, Marker, MarkerClusterer } from "@react-google-maps/api";

// [Entities Layer]
import { useSelectedPlacesStore } from "@/entities/place/model/selectedPlacesStore";
import { usePlaceDetailsQuery } from "@/entities/place/place-details/lib/usePlaceDetailsQuery";
import { PlaceInfoWindow } from "@/entities/place/place-details/ui/PlaceInfoWindow";

// [Shared Layer]
import MyMap from "@/shared/ui/GoogleMap/MyMap";
import { useMapHover } from "@/shared/lib/hooks/useMapHover";
import type { NearPlace } from "@/shared/types/nearPlaceType";

type TravelMapWidgetProps = {
  places?: NearPlace[];
};

const TravelMapWidget = React.memo(
  ({ places }: TravelMapWidgetProps) => {
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
    const clustererOptions = {
      maxZoom: 12, //높을수록 확대를 많이 해야지 클러스터가 해제(마커 분리)
    }


    return (
      <MyMap place={center} zoom={13}>
        {/* 2. MarkerClusterer로 마커 매핑 로직을 감싸줍니다. */}
        <MarkerClusterer options={clustererOptions}>
          {(clusterer) => (
            <>
              {places?.map((placeItem) => (
                <Marker
                  key={placeItem.placeId}
                  position={placeItem.nearCoordinates}
                  // ⚠️ 중요: clusterer 등록을 위해 꼭 넣어주어야 합니다.
                  clusterer={clusterer} 
                  onClick={() => addPlace(placeItem)}
                  onMouseOver={() => handleMouseOver(placeItem.placeId)}
                  onMouseOut={handleMouseOut}
                >
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
            </>
          )}
        </MarkerClusterer>
      </MyMap>
    );
  }
);

TravelMapWidget.displayName = "TravelMapWidget";
export default TravelMapWidget;