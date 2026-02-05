import React from "react";
import type { NearPlace } from "../../../shared/types/nearPlaceType";
import { Trash2, MapPin } from "lucide-react";

// shadcn 컴포넌트 임포트
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type SelectedListProps = {
  place?: NearPlace[];
  onRemovePlace: (placeId: string) => void;
};

const SelectedList = React.memo(
  ({ place, onRemovePlace }: SelectedListProps) => {
    console.log("SelectedList 렌더링:", { place });

    const hasPlaces = place && place.length > 0;

    return (
      <Card className="flex flex-col h-full border-none shadow-md bg-slate-50/50 overflow-hidden">
        {/* flex-none: 헤더는 높이가 늘어나지 않도록 고정합니다. */}
        <CardHeader className="flex-none pb-3">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <MapPin className="w-5 h-5 text-primary" />
            선택한 장소
            {hasPlaces && (
              <Badge variant="secondary" className="ml-2 font-normal">
                {place.length}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>

        {/* 핵심 수정 포인트: 
          1. flex-1: Card 안에서 남은 모든 높이를 차지합니다.
          2. min-h-0: 자식 콘텐츠(리스트)가 길어져도 부모 박스를 뚫고 나가지 않게 제한합니다.
          3. flex flex-col: 내부의 ScrollArea가 flex-1을 가질 수 있도록 레이아웃을 잡습니다.
        */}
        <CardContent className="flex-1 min-h-0 p-4 pt-0 overflow-hidden flex flex-col">
          {hasPlaces ? (
            <ScrollArea className="flex-1 w-full pr-4">
              <ul className="space-y-3 pb-2">
                {place.map((placeItem) => (
                  <li
                    key={placeItem.placeId}
                    className="group flex justify-between items-center bg-white p-3 rounded-lg border border-slate-100 shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-sm font-semibold text-slate-700 leading-none truncate">
                        {placeItem.title}
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemovePlace(placeItem.placeId)}
                      className="flex-none h-8 w-8 text-slate-400 hover:text-destructive hover:bg-destructive/10 transition-colors"
                      aria-label={`${placeItem.title} 삭제`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 rounded-xl px-4">
              <p className="text-slate-400 text-sm font-medium">
                아직 선택된 장소가 없습니다.
              </p>
              <p className="text-slate-300 text-xs mt-1">
                원하는 장소를 리스트에서 추가해보세요.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  },
);

SelectedList.displayName = "SelectedList";

export default SelectedList;
