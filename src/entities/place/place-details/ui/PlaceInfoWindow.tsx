// 마커에 마우스를 올리면 디테일한 정보를 보여주는 컴포넌트

import type { PlaceDetailResponse } from "@/entities/place/place-details/model/types";
import { getPhotoUrl } from "@/shared/lib/getPhotoUrl";

interface PlaceInfoWindowProps {
  place: PlaceDetailResponse | null; // null 허용
}

export const PlaceInfoWindow = ({ place }: PlaceInfoWindowProps) => {
if (!place) {
    return (
      <div className="p-2 text-xs text-slate-500 font-medium">
        정보 없음
      </div>
    );
  }

  return (
    <article className="p-2 max-w-[220px] bg-white rounded-lg antialiased">
      
      {place.photos && place.photos.length > 0 && (
        <img
          src={getPhotoUrl(place.photos[0].photo_reference)}
          alt={`${place.name} 전경`} // 💡 alt 텍스트를 조금 더 구체화하여 접근성 향상
          className="w-full h-[120px] rounded-md object-cover mb-2.5 shadow-sm"
        />
      )}
      
      <h4 className="m-0 text-sm font-bold text-slate-900 tracking-tight leading-snug">
        {place.name}
      </h4>
      
      {place.editorial_summary?.overview && (
        <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-3">
          {place.editorial_summary.overview}
        </p>
      )}
    </article>
  );
};
