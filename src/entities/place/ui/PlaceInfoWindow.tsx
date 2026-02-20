// 마커에 마우스를 올리면 디테일한 정보를 보여주는 컴포넌트

import type { PlaceDetailResponse } from "@/features/place-details/model/types";
import { getPhotoUrl } from "../../../shared/lib/getPhotoUrl";
import type { NearPlace } from "../../../shared/types/nearPlaceType";

interface PlaceInfoWindowProps {
  place: PlaceDetailResponse | null; // null 허용
}

export const PlaceInfoWindow = ({ place }: PlaceInfoWindowProps) => {
  // 데이터가 없으면 아무것도 보여주지 않거나 로딩 메시지 출력
  if (!place)
    return <div style={{ padding: "8px", fontSize: "12px" }}>로딩 중...</div>;

  return (
    <div style={{ padding: "8px", maxWidth: "200px" }}>
      {place.photos && place.photos.length > 0 && (
        <img
          src={getPhotoUrl(place.photos[0].photo_reference)}
          alt={place.name}
          style={{
            width: "100%",
            height: "120px",
            borderRadius: "4px",
            objectFit: "cover",
            marginBottom: "8px",
          }}
        />
      )}
      <h4 style={{ margin: "0 0 4px 0", fontSize: "14px" }}>{place.name}</h4>
      {place.editorial_summary?.overview && (
        <p style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
          {place.editorial_summary.overview}
        </p>
      )}
    </div>
  );
};
