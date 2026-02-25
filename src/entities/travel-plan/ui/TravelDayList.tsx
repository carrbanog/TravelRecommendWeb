import { MapPin, Bus, Footprints, Car } from "lucide-react"; // 아이콘 라이브러리 사용 가정
import { Badge } from "@/components/ui/badge"; // shadcn/ui badge
import { Separator } from "@/components/ui/separator"; // shadcn/ui separator
import type { PlanPlace } from "../../place/model/type";
import { useFetchDistanceQuery } from "@/features/calculate-distance/api/fetchDistance";

interface TravelDayListProps {
  dayIndex: number;
  places: PlanPlace[] | undefined;
}

export const TravelDayList = ({ dayIndex, places }: TravelDayListProps) => {
  // 교통수단 아이콘 배열 (랜덤/임의 표시용)
  const transportIcons = [
    <Bus size={14} />,
    <Footprints size={14} />,
    <Car size={14} />,
  ];

  const { data, isLoading } = useFetchDistanceQuery();
  console.log("거리 데이터:", data);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2 mb-4">
        <Badge variant="default" className="bg-blue-600">
          Day {dayIndex + 1}
        </Badge>
        <span className="text-gray-400 text-sm font-normal">Step by Step</span>
      </h3>

      {places && places.length > 0 ? (
        <div className="relative pl-2">
          {places.map((place, idx) => (
            <div key={place.id} className="relative">
              {/* 1. 장소 카드 영역 */}
              <div className="flex items-start gap-4 mb-2">
                {/* 타임라인 포인트 아이콘 */}
                <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-blue-500 shadow-sm text-blue-600 font-bold text-xs shrink-0">
                  {idx + 1}
                </div>

                <div className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors shadow-sm">
                  <p className="font-semibold text-gray-800 text-sm">
                    {place.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <MapPin size={12} /> 상세 위치 정보
                  </p>
                </div>
              </div>

              {/* 2. 이동 경로 정보 (마지막 요소가 아닐 때만 렌더링) */}
              {idx < places.length - 1 && (
                <div className="flex items-center gap-4 my-1 ml-4 border-l-2 border-dashed border-gray-300 h-12">
                  <div className="flex items-center gap-2 ml-6 text-xs font-medium text-gray-400 bg-white px-2 py-1 border rounded-full shadow-sm">
                    {transportIcons[idx % 3]}
                    <span>약 {Math.floor(Math.random() * 30) + 10}분 이동</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-400 text-sm">계획된 장소가 없습니다.</p>
        </div>
      )}
    </div>
  );
};
