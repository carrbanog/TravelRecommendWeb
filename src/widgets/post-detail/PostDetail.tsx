import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Entities & Features (FSD 하위 계층)
import { usePost } from "@/entities/post/model/usePost";
import { DeletePostButton } from "@/features/post/ui/DeletePostButton";
import { CommentForm } from "@/features/comment/add/ui/CommentForm";
import { CommentList } from "@/entities/comment/ui/CommentList";

// Shared (Providers, UI Components, Utils, Icons)
import { useAuth } from "@/app/providers/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { User, ArrowLeft } from "lucide-react";

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Entity 커스텀 훅 사용
  const { data: post, isLoading, error } = usePost(id!);
  console.log("PostDetail - usePost 결과:", { post, isLoading, error });
  // 날짜 포맷팅 헬퍼 함수 (필요 시 shared/lib/utils 로 분리 가능)
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };
  console.log("포스트 정보:", post);
  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-red-500 gap-4">
        <p className="font-semibold text-lg">게시글을 불러오지 못했습니다 😢</p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          뒤로 가기
        </Button>
      </div>
    );

  return (
    <div className="flex flex-col w-full max-w-screen-xl mx-auto py-8 px-4 gap-6">
      {/* 1. 상단 액션 바 */}
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-slate-500"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> 목록으로 돌아가기
        </Button>

        {/* Feature: 작성자 본인일 경우에만 삭제 버튼 노출 */}
        {!isLoading && post?.author === user?.email && (
          <DeletePostButton postId={id!} />
        )}
      </div>

      <Card className="h-full shadow-lg border-gray-100 bg-white/80 backdrop-blur-sm overflow-hidden">
        {/* 2. 헤더 영역 */}
        <CardHeader className="space-y-6 pb-6 pt-6 bg-slate-50/50">
          <div className="space-y-2">
            {isLoading ? (
              <Skeleton className="h-10 w-3/4" />
            ) : (
              <CardTitle className="text-3xl font-bold text-slate-900">
                {post?.title}
              </CardTitle>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ) : (
                <>
                  <div className="p-1.5 rounded-full bg-sky-100 text-sky-600">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700">
                    {post?.author}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4">
              {isLoading ? (
                <Skeleton className="h-4 w-40" />
              ) : (
                <div className="text-sm text-slate-500">
                  {formatDate(post?.createdAt)}
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <Separator className="bg-gray-300 mx-2 w-auto" />

        {/* 3. 본문 영역 */}
        <CardContent className="p-8 sm:p-10 min-h-[500px]">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-[90%]" />
              <div className="py-4">
                <Skeleton className="h-[300px] w-3/5 mx-auto" />
              </div>
              <Skeleton className="h-6 w-full" />
            </div>
          ) : (
            <div
              className="ql-editor text-lg text-slate-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post?.content || "" }}
            />
          )}
        </CardContent>
        <Separator className="bg-gray-300 mx-2 w-auto" />

        {/* 4. 댓글 작성 폼 */}
        <div className="p-8 sm:px-10 bg-slate-50/30">
          <h3 className="text-xl font-bold text-slate-900 mb-6">댓글</h3>
          
          {/* 댓글 작성 폼 (Feature 계층) */}
          {user && post ? (
            <div className="mt-8">
              <CommentForm postId={post._id} userEmail={user.email} />
              <CommentList postId={post._id} userEmail={user?.email} />
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg border border-dashed border-slate-200">
              <p className="text-slate-500">
                로그인하고 여행에 대한 의견을 나눠보세요!
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
