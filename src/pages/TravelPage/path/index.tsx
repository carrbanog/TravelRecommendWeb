import React from "react";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";
import MyMap from '../../../shared/ui/GoogleMap/MyMap';

const TravelPathPage = () => {
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);

  return (
    <MyMap />
  );
};

export default TravelPathPage;
