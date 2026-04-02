// 1. 외부 라이브러리 (React, 서드파티 패키지)
import { Bus, Car, Footprints, HelpCircle, MapPin } from "lucide-react";

// 2. 공통 UI 컴포넌트 (Shared 계층 / shadcn ui 등)
import { Badge } from "@/components/ui/badge";

// 3. 기능 (Features 계층 - API, 훅 등)
import { useFetchDistanceQuery } from "@/features/calculate-distance/api/fetchDistance";

// 4. 타입 (Types - 도메인 모델, 응답 타입 등)
import type { PlanPlace } from "@/entities/place/model/type"; // 상대경로(../../)를 절대경로(@/)로 통일
import type { RouteStep } from "@/features/calculate-distance/model/type";
import { da } from 'date-fns/locale';

interface TravelDayListProps {
  dayIndex: number;
  places: PlanPlace[] | undefined;
}

// 각 여행 계획 카드(하루)를 렌더링하는 컴포넌트
export const TravelDayList = ({ dayIndex, places }: TravelDayListProps) => {
  const locations = places?.map((place) => place.nearCoordinates) || [];

  const { data: routeData, isLoading } = useFetchDistanceQuery(locations);

  console.log("TravelDayList Route Data:", routeData, dayIndex, places);
  // mode에 따른 아이콘 렌더링 헬퍼 함수
  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case "transit":
      case "TRANSIT":
        return <Bus size={14} />;
      case "walking":
      case "WALKING":
        return <Footprints size={14} />;
      case "driving":
      case "DRIVING":
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
            const routeInfo = routeData?.distances?.find(
              (d: any) => d.fromIndex === idx,
            );
            console.log("test", { routeInfo });
            return (
              <div key={place.id} className="relative">
                {/* 1. 장소 카드 영역 */}
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
                  // ✅ 여러 내용이 들어가도록 flex-col과 gap을 추가하고 높이를 자동(min-h)으로 변경
                  <div className="flex flex-col gap-2 my-1 ml-4 border-l-2 border-dashed border-gray-300 min-h-[3rem] py-2">
                    {/* A. 이동 요약 뱃지 (기존) */}
                    <div className="flex items-center gap-2 ml-6 text-xs font-medium text-gray-600 bg-white px-3 py-1.5 border rounded-full shadow-sm w-fit">
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

                    {/* 경로 상세 정보(이동수단 + 시간)*/}
                    {!isLoading && routeInfo && (
                      <div className="ml-6 flex flex-col gap-2">
                        {/* 상세 스텝(steps) 배열 출력 */}
                        {routeInfo.steps && routeInfo.steps.length > 0 && (
                          <div className="flex flex-col gap-1.5 mt-1">
                            {routeInfo.steps.map(
                              (step: RouteStep, stepIdx: number) => (
                                <div
                                  key={stepIdx}
                                  className="flex items-start gap-1.5 text-[11px] text-gray-500 bg-gray-50 p-1.5 rounded border border-gray-100"
                                >
                                  <span className="mt-0.5 text-gray-400">
                                    {getTransportIcon(step.mode)}
                                  </span>
                                  <span>
                                    {step.instruction}{" "}
                                    <span className="text-gray-400 font-medium">
                                      ({step.duration})
                                    </span>
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    )}
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
