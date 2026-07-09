// src/pages/post-detail/ui/PostDetailSkeleton.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const PostDetailSkeleton = () => {
  return (
    <div className="flex flex-col w-full max-w-screen-xl mx-auto py-8 px-4 gap-6">
      {/* 로딩 중에도 목록 돌아가기 버튼 레이아웃 유지 */}
      <nav className="flex justify-between items-center" aria-label="게시글 액션 로딩 중">
        <Button variant="ghost" className="text-slate-400" disabled>
          <ArrowLeft className="w-4 h-4 mr-2" /> 목록으로 돌아가기
        </Button>
      </nav>

      <Card className="h-full shadow-lg border-gray-100 bg-white/80 backdrop-blur-sm overflow-hidden">
        <article>
          <CardHeader className="space-y-6 pb-6 pt-6 bg-slate-50/50">
            <header>
              <div className="space-y-2">
                <Skeleton className="h-10 w-3/4" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            </header>
          </CardHeader>

          <Separator className="bg-gray-300 mx-2 w-auto" />

          <CardContent className="p-8 sm:p-10 min-h-[500px]">
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-[90%]" />
              <div className="py-4">
                <Skeleton className="h-[300px] w-3/5 mx-auto" />
              </div>
              <Skeleton className="h-6 w-full" />
            </div>
          </CardContent>
        </article>
      </Card>
    </div>
  );
};