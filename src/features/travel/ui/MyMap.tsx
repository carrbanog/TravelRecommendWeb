import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import { fetchMapCode } from "../api/fetchMapCode";
import { useEffect } from "react";
import { fetchNearbyPlaces } from "../api/fetchNearbyPlaces";
import type { coordinates } from "../model/addressType";

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
