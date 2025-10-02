import React from "react";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";
import MyMap from "../../../shared/ui/GoogleMap/MyMap";
import { Marker } from "@react-google-maps/api";

const TravelPathPage = () => {
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  console.log(selectedPlaces[0].nearCoordinates);
  return (
    <div className="h-screen w-full">
      <MyMap place={selectedPlaces[0]?.nearCoordinates}>
        {selectedPlaces.map((placeItem, idx) => (
          <Marker key={idx} position={placeItem.nearCoordinates} />
        ))}
      </MyMap>
    </div>
  );
};

export default TravelPathPage;
