import React from "react";
import { useSelectedPlacesStore } from "../model/selectedPlacesStore";
import type { NearPlace } from "../../../shared/types/nearPlaceType";

import { MdDelete } from "react-icons/md";

type SelectedListProps = {
  place?: NearPlace[];
  onRemovePlace: (place: NearPlace) => void;
};

const SelectedList = ({ place, onRemovePlace }: SelectedListProps) => {
  // const selectedPlaces = useSelectedPlacesStore(
  //   (state) => state.selectedPlaces
  // );
  return (
    <ul>
      {place?.map((placeItem, idx) => (
        <li key={idx}>
          <span>{placeItem.title}</span>
          <button onClick={() => onRemovePlace(placeItem)}>
            <MdDelete />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SelectedList;
