import React from "react";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";
import MyMap from "../../../shared/ui/GoogleMap/MyMap";
import { Marker } from "@react-google-maps/api";

const TravelPathPage = () => {
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);

  return (
    <div className="h-screen w-full flex flex-col">
      {/* 상단 헤더 */}

      {/* 본문 */}
      <main className="flex flex-1 gap-4 p-4">
        {/* 지도 영역 70% */}
        <div className="w-[70%] rounded-lg overflow-hidden shadow-md">
          <MyMap place={selectedPlaces[0]?.nearCoordinates}>
            {selectedPlaces.map((placeItem, idx) => (
              <Marker key={idx} position={placeItem.nearCoordinates} />
            ))}
          </MyMap>
        </div>
      </main>
    </div>
  );
};

export default TravelPathPage;