// postSearch와 PostRow를 widget에서 조립

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Icons
import { PenLine, MapPin } from "lucide-react";

// FSD Imports
import { fetchPosts } from "@/entities/post/api/postApi";
import type { Post } from "@/entities/post/model/postTypes";

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
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/app/providers/AuthProvider";
import PostSearch from "../../features/post/ui/PostSearch";
import PostRow from "@/entities/post/ui/PostRow";

const PostList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  console.log("PostList - useQuery 결과:", { posts, isLoading, error });
  // 검색시 게시판 필터링
  const filteredPosts = posts?.filter((post) =>
    post.title.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

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
    <section className="container max-w-screen-xl mx-auto py-8 h-full flex flex-col gap-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PostSearch onSearch={setSearchKeyword} />

        <Button
          onClick={() => navigate("/post/create")}
          disabled={!user}
          className="bg-sky-500 hover:bg-sky-600 text-white shadow-md transition-all hover:scale-105"
        >
          <PenLine className="w-4 h-4 mr-2" /> 새 여행기 작성
        </Button>
      </header>

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
                {filteredPosts && filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <PostRow post={post} key={post._id} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center gap-3 text-gray-400">
                        <div className="p-4 rounded-full bg-gray-50">
                          <MapPin
                            className="w-8 h-8 text-gray-300"
                            aria-hidden="true"
                          />
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
    </section>
  );
};

export default PostList;
