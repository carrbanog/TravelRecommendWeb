import { useState } from "react";
import React from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import type { coordinates } from "../../types/coordinatestype";
import type { NearPlace } from "../../types/nearPlaceType";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";

export type MyMapProps = {
  place?: coordinates; //초반에 값이 없을 경우 대비
  nearPlaces?: NearPlace[]; //초반에 값이 없을 경우 대비
  onAddPlace: (place:NearPlace) => void
};

const MyMap = ({ place, nearPlaces, onAddPlace }: MyMapProps) => {
  // const [selectedPlace, setSelectedPlace] = useState<NearPlace | undefined>();
  const defaultCoords: coordinates = { lat: 37.5665, lng: 126.989 };
  const mapCenter = place ?? defaultCoords; //지도 기본 위치 지정

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={mapCenter}
      zoom={13}
    >
      {/* 마커 예시 */}
      {/* <Marker position={mapCenter} /> */}
      {nearPlaces?.map((placeItem, index) => (
        <Marker
          key={index}
          position={placeItem.nearCoordinates}
          onClick={() => onAddPlace(placeItem)}
        />
      ))}

      {/* {selectedPlace && (
          <InfoWindow
            position={selectedPlace.nearCoordinates}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div className="p-2">
              <h3 className="font-bold">{selectedPlace.title}</h3>
              <button
                className="mt-2 px-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => {
                  onAddPlace?.(selectedPlace);
                  setSelectedPlace(null);
                }}
              >
                리스트에 추가
              </button>
            </div>
          </InfoWindow>
        )} */}
    </GoogleMap>
  );
};

export default MyMap;
