import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import type { coordinates } from "../../types/coordinatestype";

export type MyMapProps = {
  center: coordinates;
};

const MyMap = ({ center }: MyMapProps) => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={12}
      >
        {/* 마커 예시 */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MyMap;
