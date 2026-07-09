import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PopularPostCardSkeleton = () => {
  return (
    <Card className="overflow-hidden shadow-sm bg-white flex flex-col h-full">
      <CardContent className="p-0 flex flex-col h-full">
        {/* 1. 썸네일 이미지 영역 스켈레톤 */}
        <div className="relative aspect-square bg-slate-100">
          <Skeleton className="w-full h-full rounded-none" />
        </div>

        {/* 2. 텍스트 및 메타 정보 영역 스켈레톤 */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* 제목 영역 (2줄 느낌을 내기 위해 크기를 다르게 2개 배치) */}
            <Skeleton className="h-5 w-11/12 mb-2" />
            <Skeleton className="h-5 w-2/3" />
          </div>

          {/* 푸터 영역 (작성자 및 작성일) */}
          <div className="flex items-center justify-between mt-6">
            {/* 작성자 스켈레톤 */}
            <div className="flex items-center gap-1.5">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* 작성일 스켈레톤 */}
            <div className="flex items-center gap-1">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};