import React, { useState } from "react";
import { useCreatePost } from "../../../entities/post/hooks/useCreatePost";
import type { CreatePost } from "../../../entities/post/model/postTypes";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

// Shadcn UI Imports
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Icons
import { Save, Loader2 } from "lucide-react";

export const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const { mutateAsync, isPending } = useCreatePost();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    // 2. 유효성 검사 (제목)
    if (!title.trim()) {
      toast.error("제목을 입력해주세요!");
      return; // 함수 종료
    }

    // 3. 유효성 검사 (내용)
    if (!content.trim()) {
      toast.error("내용을 입력해주세요!");
      return; // 함수 종료
    }

    const author = user.email.split("@")[0];

    const newPost: CreatePost = { title, content, author };
    try {
      await mutateAsync(newPost);
      setTitle("");
      setContent("");
      toast.success("게시글이 성공적으로 작성되었습니다.");
      navigate("/community");
    } catch (error) {
      toast.error("게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-screen-xl mx-auto py-8 px-4">
      <Card className="h-full shadow-lg border-gray-100 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            새 여행기 작성
          </CardTitle>
          <CardDescription className="text-slate-500">
            나만의 특별한 여행 경험을 공유해보세요.
          </CardDescription>
        </CardHeader>

        {/* 글쓰기 본문 */}
        <CardContent className="h-full">
          <form onSubmit={handleSubmit} className="h-full flex flex-col gap-6">
            {/* 제목 영역 */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-base font-semibold text-slate-700"
              >
                제목
              </Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="여행의 핵심을 담은 제목을 입력하세요"
                className="text-lg py-6 focus-visible:ring-blue-500"
              />
            </div>

            {/* 내용 영역 */}
            <div className="flex-1 space-y-2 min-h-[400px]">
              <Label
                htmlFor="content"
                className="text-base font-semibold text-slate-700"
              >
                내용
              </Label>
              <Textarea
                id="content"
                placeholder="여행기의 내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="h-full min-h-[300px] text-lg resize-none focus-visible:ring-blue-500 p-2"
              />
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-sky-500 hover:bg-sky-600 text-white shadow-md transition-all hover:scale-105"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    저장하기
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePostForm;
