import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import type { coordinates } from "../../types/coordinatestype";
import type { NearPlace } from "../../types/nearPlaceType";
import { useState } from "react";

export type MyMapProps = {
  place?: coordinates; //초반에 값이 없을 경우 대비, 기본 지도 위치
  nearPlaces?: NearPlace[]; //초반에 값이 없을 경우 대비, 근처 여행지 추천
};

const MyMap = ({ place, nearPlaces }: MyMapProps) => {
  const [selectedPlace, setSelectedPlace] = useState<NearPlace | undefined>();
  const defaultCoords: coordinates = { lat: 37.5665, lng: 126.989 };
  const mapCenter = place ?? defaultCoords; //지도 기본 위치 지정
  // console.log(nearPlaces);
  // console.log(selectedPlace.nearCoordinates);
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={mapCenter}
        zoom={12}
      >
        {/* 마커 예시 */}
        {/* <Marker position={mapCenter} /> */}
        {nearPlaces?.map((placeItem, index) => (
          <Marker
            key={index}
            position={placeItem.nearCoordinates}
            onClick={() => setSelectedPlace(placeItem)}
          />
        ))}

        {selectedPlace && (
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
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMap;
