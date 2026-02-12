import type { NearPlace } from "../../../shared/types/nearPlaceType";
import { useSelectedPlacesStore } from "../model/selectedPlacesStore";
import { DraggableListCard } from "./DraggableListCard";
import { Package, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type SelectedPlace = Pick<NearPlace, "title" | "nearCoordinates" | "placeId">;

type SelectedListCardProps = {
  selectedPlaces: SelectedPlace[];
};

export const SelectedListCard = ({ selectedPlaces }: SelectedListCardProps) => {
  const removePlace = useSelectedPlacesStore((s) => s.removePlace);

  return (
    <section className="flex flex-col h-full bg-white/50 backdrop-blur-sm">
      {/* 섹션 헤더: 보관함 상태 표시 */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 rounded-lg">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">장소 보관함</h2>
          <Badge
            variant="secondary"
            className="ml-1 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none"
          >
            {selectedPlaces.length}
          </Badge>
        </div>
        <p className="text-xs text-slate-400 font-medium">
          카드를 아래 일차별 카드로 드래그하세요
        </p>
      </div>

      {/* 카드 그리드 영역 */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {selectedPlaces.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {selectedPlaces.map((place) => (
              <DraggableListCard
                key={place.placeId}
                place={place}
                onRemove={removePlace}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-20 text-slate-300">
            <MapPin className="w-12 h-12 mb-3 opacity-20" />
            <p className="font-medium">선택된 장소가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
};
