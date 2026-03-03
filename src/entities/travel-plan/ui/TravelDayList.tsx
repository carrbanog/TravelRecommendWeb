import { MapPin, Bus, Footprints, Car, HelpCircle } from "lucide-react"; // 아이콘 라이브러리 사용 가정
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

  const locations = places?.map((place) => place.nearCoordinates) || [];

  const { data, isLoading } = useFetchDistanceQuery(locations);
  console.log("요청한 위치 데이터:", places);
  console.log("거리 데이터:", data);
  // mode에 따른 아이콘 렌더링 헬퍼 함수
  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case "transit":
        return <Bus size={14} />;
      case "walking":
        return <Footprints size={14} />;
      case "driving":
        return <Car size={14} />;
      default:
        return <HelpCircle size={14} />;
    }
  };

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
          {places.map((place, idx) => {
            // 현재 장소에서 다음 장소로 가는 이동 정보 찾기
            const routeInfo = data?.data?.distances?.find(
              (d: any) => d.fromIndex === idx,
            );

            return (
              <div key={place.id} className="relative">
                {/* 1. 장소 카드 영역 (기존 코드 유지) */}
                <div className="flex items-start gap-4 mb-2">
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

                {/* 2. 이동 경로 정보 (마지막 요소가 아닐 때만) */}
                {idx < places.length - 1 && (
                  <div className="flex items-center gap-4 my-1 ml-4 border-l-2 border-dashed border-gray-300 h-12">
                    <div className="flex items-center gap-2 ml-6 text-xs font-medium text-gray-600 bg-white px-3 py-1.5 border rounded-full shadow-sm">
                      {isLoading ? (
                        <span className="text-gray-400">계산 중...</span>
                      ) : routeInfo ? (
                        <>
                          {getTransportIcon(routeInfo.mode)}
                          <span>
                            {routeInfo.distanceText} · {routeInfo.durationText}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-400">경로 정보 없음</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-400 text-sm">계획된 장소가 없습니다.</p>
        </div>
      )}
    </div>
  );
};
