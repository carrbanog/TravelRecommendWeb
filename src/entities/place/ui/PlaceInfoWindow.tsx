// 마커에 마우스를 올리면 디테일한 정보를 보여주는 컴포넌트

import { getPhotoUrl } from "../../../shared/lib/getPhotoUrl";
import type { NearPlace } from "../../../shared/types/nearPlaceType";

interface PlaceInfoWindowProps {
  place: NearPlace;
}

export const PlaceInfoWindow = ({ place }: PlaceInfoWindowProps) => {
  return (
    <div style={{ padding: "8px", maxWidth: "200px" }}>
      {/* 사진이 있을 경우 첫 번째 사진을 보여줌 */}
      {place.photos && place.photos.length > 0 && (
        <img
          src={getPhotoUrl(place.photos[0].photo_reference)}
          alt={place.title}
          style={{
            width: "100%",
            height: "120px",
            borderRadius: "4px",
            objectFit: "cover",
            marginBottom: "8px",
          }}
        />
      )}
      <h4 style={{ margin: "0 0 4px 0", fontSize: "14px" }}>{place.title}</h4>
      <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>{place.type}</p>
    </div>
  );
};
