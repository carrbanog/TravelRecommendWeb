import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Icons
import { PenLine, CalendarDays, User, FileText, MapPin } from "lucide-react";

// FSD Imports
import { fetchPosts } from "../../../entities/post/api/postApi";
import type { Post } from "../../../entities/post/model/postTypes";

// Shadcn UI Imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/app/providers/AuthProvider";

const PostList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  console.log("Fetched posts:", user);
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[50vh] text-sky-600 animate-pulse">
        <MapPin className="w-6 h-6 mr-2" /> 여행 기록을 불러오는 중...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-red-500">
        <span className="font-semibold">에러가 발생했습니다 😢</span>
        <Button variant="link" onClick={() => window.location.reload()}>
          다시 시도하기
        </Button>
      </div>
    );

  return (
    <div className="container max-w-5xl mx-auto py-8 h-full flex flex-col gap-6">
      {/* 상단 헤더 영역: 제목과 글쓰기 버튼 배치 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Button
          onClick={() => navigate("/post/create")}
          disabled={!user}
          className="bg-sky-500 hover:bg-sky-600 text-white shadow-md transition-all hover:scale-105"
        >
          <PenLine className="w-4 h-4 mr-2" /> 새 여행기 작성
        </Button>
        <div>
          <form action="">
            <input type="text" placeholder="검색어를 입력하세요" />
          </form>
        </div>
      </div>

      {/* 메인 테이블 카드 */}
      <Card className="border-gray-100 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-auto">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="hover:bg-transparent border-b-gray-100">
                  <TableHead className="w-[60%] pl-6 py-4 text-gray-500 font-medium text-xs uppercase tracking-wider">
                    제목
                  </TableHead>
                  <TableHead className="w-[20%] text-center text-gray-500 font-medium text-xs uppercase tracking-wider">
                    작성자
                  </TableHead>
                  <TableHead className="w-[20%] text-right pr-6 text-gray-500 font-medium text-xs uppercase tracking-wider">
                    작성일
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <TableRow
                      key={post._id}
                      onClick={() => navigate(`/post/${post._id}`)}
                      className="group cursor-pointer border-b-gray-50 hover:bg-sky-50/60 transition-colors duration-200"
                    >
                      {/* 제목 컬럼 */}
                      <TableCell className="pl-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-700 group-hover:text-sky-700 transition-colors truncate max-w-[200px] md:max-w-md">
                            {post.title}
                          </span>
                          {/* 새 글인 경우 뱃지 표시 (로직은 예시) */}
                          {new Date().getTime() -
                            new Date(post.createdAt).getTime() <
                            86400000 && (
                            <Badge
                              variant="secondary"
                              className="bg-sky-100 text-sky-700 text-[10px] px-1.5 h-5"
                            >
                              N
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      {/* 작성자 컬럼 */}
                      <TableCell className="text-center py-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-600 text-sm">
                          <User className="w-3 h-3 text-gray-400" />
                          {post.author}
                        </div>
                      </TableCell>

                      {/* 작성일 컬럼 */}
                      <TableCell className="text-right pr-6 py-4">
                        <div className="flex items-center justify-end gap-1 text-gray-400 text-sm font-light">
                          <CalendarDays className="w-3 h-3" />
                          {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center gap-3 text-gray-400">
                        <div className="p-4 rounded-full bg-gray-50">
                          <MapPin className="w-8 h-8 text-gray-300" />
                        </div>
                        <p>아직 등록된 여행기가 없습니다.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostList;
