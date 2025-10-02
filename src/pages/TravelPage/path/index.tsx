import React from "react";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";

const TravelPathPage = () => {
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);

  return (
    <ul>
      {selectedPlaces.map((placeItem, idx) => (
        <li key={idx}>{placeItem.title}</li>
      ))}
    </ul>
  );
};

export default TravelPathPage;
