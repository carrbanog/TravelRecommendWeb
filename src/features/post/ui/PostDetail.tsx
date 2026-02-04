import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById } from "../../../entities/post/api/postApi";

// Shadcn UI Imports
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Icons
import {
  User,
  CalendarDays,
  Clock,
  MapPin,
  Loader2,
  ArrowLeft,
} from "lucide-react";

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id!),
    enabled: !!id,
  });

  // 날짜 포맷팅 헬퍼 함수
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 로딩 상태
  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-sky-600 gap-2">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="font-medium animate-pulse">
          여행기를 불러오는 중입니다...
        </p>
      </div>
    );

  // 에러 상태
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
    <div className="flex flex-col h-full w-full max-w-screen-xl mx-auto py-8 px-4 gap-6">
      {/* 상단 네비게이션 (뒤로가기) */}
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-slate-500 hover:text-slate-800 hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> 목록으로 돌아가기
        </Button>
      </div>

      <Card className="h-full shadow-lg border-gray-100 bg-white/80 backdrop-blur-sm overflow-hidden">
        {/* 1. 헤더 영역 */}
        <CardHeader className="space-y-6 pb-6 pt-6 bg-slate-50/50">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">
              {post?.title}
            </CardTitle>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-slate-500">
            {/* 작성자 정보 */}
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-sky-100 text-sky-600">
                <User className="w-4 h-4" />
              </div>
              <span className="font-medium text-slate-700">{post?.author}</span>
            </div>

            {/* 작성일 정보 */}
            <div className="flex items-center gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-slate-400" />
                <span>{formatDate(post?.createdAt)}</span>
              </div>
              <Separator
                orientation="vertical"
                className="hidden sm:block h-3 bg-slate-300"
              />
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{formatTime(post?.createdAt)}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <Separator className="bg-gray-300 mx-2 w-auto" />

        {/* 2. 본문 영역 */}
        <CardContent className="p-8 sm:p-10 min-h-[500px]">
          {/* 본문 텍스트 */}
          <div className="text-lg text-slate-800 leading-relaxed whitespace-pre-line break-words">
            {post?.content}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 혹시 모를 호환성을 위해 default export도 남겨둡니다.
// (FSD 구조에서는 위처럼 Named Export를 권장합니다)
export default PostDetail;
