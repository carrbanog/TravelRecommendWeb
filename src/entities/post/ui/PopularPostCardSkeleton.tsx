import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PopularPostCardSkeleton = () => {
  return (
    <Card className="overflow-hidden shadow-sm bg-white flex flex-col h-full">
      <CardContent className="p-0 flex flex-col h-full">
        {/* 1. 썸네일 영역 */}
        <div className="relative aspect-square bg-slate-100">
          <Skeleton className="w-full h-full rounded-none" />
        </div>

        {/* 2. 텍스트 영역 */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <header className="min-h-[56px] flex flex-col justify-between py-0.5">
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-5 w-2/3" />
          </header>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1.5">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
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
