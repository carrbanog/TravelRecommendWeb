import { useState } from "react";
import React from "react";
import {
  GoogleMap,
  Marker,
} from "@react-google-maps/api";

import type { coordinates } from "../../types/coordinatestype";
import type { NearPlace } from "../../types/nearPlaceType";

//나중에 경로 지정할 때 마커 분리 생각하기

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
    </GoogleMap>
  );
};

export default MyMap;
