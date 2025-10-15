import { LoadScriptNext, Marker } from "@react-google-maps/api";
import MyMap from "../../../shared/ui/GoogleMap/MyMap"
import type { coordinates } from '../../../shared/types/coordinatestype';
import type { NearPlace } from '../../../shared/types/nearPlaceType';

type Props = {
  centerCoords?: coordinates;
  onMarkerClick: (place: NearPlace) => void,
  places?: NearPlace[];
  isLoading: boolean;
}

export const TravelMapWidget = ({ centerCoords, onMarkerClick, places, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-lg">
        지도 로딩 중...
      </div>
    );
  }
  return (
    <LoadScriptNext googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP}>
      <MyMap place={centerCoords}>
        {places?.map((placeItem, idx) => (
          <Marker
            key={idx}
            position={placeItem.nearCoordinates}
            onClick={() => onMarkerClick(placeItem)}
          />
        ))}
      </MyMap>
    </LoadScriptNext>
  );
};
