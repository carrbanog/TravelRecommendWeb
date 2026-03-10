import React, { useRef, useState, useMemo } from "react";
import { useCreatePost } from "../../../entities/post/hooks/useCreatePost";
import type { CreatePost } from "../../../entities/post/model/postTypes";
import { useAuth } from "../../../app/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

// React Quill Imports
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

// Shadcn UI Imports
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Icons
import { Save, Loader2 } from "lucide-react";

export const CreatePostForm = () => {
  const { user } = useAuth();
  const { mutateAsync, isPending } = useCreatePost();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const quillRef = useRef<ReactQuill>(null);

  // 1. 커스텀 이미지 핸들러: 파일을 Base64로 변환하여 에디터에 삽입
  const imageHandler = () => {
    console.log("이미지 핸들러 호출");
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Url = e.target?.result as string;
        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection();
        if (editor && range) {
          editor.insertEmbed(range.index, "image", base64Url);
          editor.setSelection(range.index + 1);
        }
      };
      reader.readAsDataURL(file);
    };
  };

  // 2. 툴바 설정 (useMemo를 사용하여 불필요한 리렌더링 방지)
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["link", "image", "video"],
          [{ color: [] }, { background: [] }],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    // 유효성 검사 (HTML 태그 제거 후 텍스트 존재 여부 확인)
    const plainText = content.replace(/<[^>]*>?/gm, "").trim();
    const hasImage = content.includes("<img");

    if (!title.trim()) {
      toast.error("제목을 입력해주세요!");
      return;
    }

    if (!plainText && !hasImage) {
      toast.error("내용을 입력해주세요!");
      return;
    }

    const author = user.email.split("@")[0];
    const newPost: CreatePost = { title, content, author };

    // 콘솔 확인용
    console.log("🚀 전송될 데이터:", newPost);

    try {
      await mutateAsync(newPost);
      setTitle("");
      setContent("");
      toast.success("게시글이 성공적으로 작성되었습니다.");
      navigate("/community");
    } catch (error) {
      toast.error("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-screen-xl mx-auto py-8 px-4">
      {/* 이미지 크기 조절을 위한 스타일 태그 */}
      <style>{`
        .ql-editor img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 10px 0;
        }
        .ql-container {
          min-height: 400px;
          font-size: 16px;
        }
      `}</style>

      <Card className="h-full shadow-lg border-gray-100 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            새 여행기 작성
          </CardTitle>
          <CardDescription className="text-slate-500">
            나만의 특별한 여행 경험을 공유해보세요.
          </CardDescription>
        </CardHeader>

        <CardContent className="h-full">
          <form onSubmit={handleSubmit} className="h-full flex flex-col gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-base font-semibold text-slate-700"
              >
                제목
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className="text-lg py-6 focus-visible:ring-sky-500"
              />
            </div>

            <div className="flex-1">
              <ReactQuill
                ref={quillRef}
                value={content}
                onChange={setContent}
                modules={modules}
                theme="snow"
                className="h-[400px] mb-12"
                placeholder="여행의 추억을 기록해보세요..."
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-sky-500 hover:bg-sky-600 text-white shadow-md transition-all hover:scale-105 px-8 py-6 text-lg"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Save className="mr-2 h-5 w-5" />
                )}
                저장하기
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePostForm;
