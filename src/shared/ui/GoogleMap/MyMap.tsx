import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import type { coordinates } from "../../types/coordinatestype";
import type { NearPlace } from "../../types/nearPlaceType"


type MarkerPlace = Pick<NearPlace, "nearCoordinates">;

export type MyMapProps = {
  place?: coordinates;  //초반에 값이 없을 경우 대비
  nearPlaces?: MarkerPlace[]; //초반에 값이 없을 경우 대비
};

const MyMap = ({ place, nearPlaces }: MyMapProps) => {
  const defaultCoords: coordinates = { lat: 37.5665, lng: 126.989 };
  const mapCenter = place ?? defaultCoords //지도 기본 위치 지정
  // console.log(nearPlaces);
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
          <Marker key={index} position={placeItem.nearCoordinates} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMap;
