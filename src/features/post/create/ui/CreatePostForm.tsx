// features/post/create/ui/CreatePostForm.tsx
import React, { useRef, useState, useMemo, useCallback } from "react";
import ReactQuill from "react-quill-new";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../../../app/providers/AuthProvider";

import { resizeImage } from "../lib/imageResizer";
import { uploadImageApi } from "../api/postApi";
import { useCreatePost } from "../model/useCreatePost";

import "react-quill-new/dist/quill.snow.css";

export const CreatePostForm = () => {
  const { user } = useAuth();
  const { mutate, isPending } = useCreatePost();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const quillRef = useRef<ReactQuill>(null);

  // 이미지 핸들러: 리사이징 -> 업로드 -> 에디터 삽입
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      toast.promise(async () => {
        // 1. 리사이징 (Client Side)
        const resizedBlob = await resizeImage(file);
        console.log("Original size:", file, "bytes");
        console.log("Resized size:", resizedBlob, "bytes");
        // 2. 업로드 (Server Side)
        const { url } = await uploadImageApi(resizedBlob);

        
        // 3. 에디터에 URL 삽입
        const editor = quillRef.current?.getEditor(); //직접적인 조작을 할 수 있는 권한 가져오기
        const range = editor?.getSelection(); // 현재 커서 위치에 이미지 삽입, 삽입 후 커서 위치 조정
        if (editor && range) {
          editor.insertEmbed(range.index, "image", url); 
          // range.index는 현재 커서 위치를 나타냅니다.
          //image는 퀼에서 제공하는 embed 타입 중 하나로, 이미지를 삽입할 때 사용됩니다.
          //url은 업로드된 이미지의 URL입니다.
          editor.setSelection(range.index + 1);
        }
      }, {
        loading: '이미지 최적화 및 업로드 중...',
        success: '이미지가 본문에 삽입되었습니다.',
        error: '이미지 처리에 실패했습니다.',
      });
    };
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["link", "image", "video"],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
      handlers: { image: imageHandler },
    },
  }), [imageHandler]);

  // 본문에서 첫 번째 이미지 URL 추출 함수
  const extractFirstImageUrl = (htmlContent: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const img = doc.querySelector("img");
  return img ? img.src : undefined; // 이미지가 없으면 undefined 반환
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return toast.error("로그인이 필요합니다.");
    if (!title.trim()) return toast.error("제목을 입력해주세요.");
    const thumbnail = extractFirstImageUrl(content);

    mutate({ title, content, author: user.email, thumbnail });
    // title, content, author을 newPost로 묶어서 mutate에 전달
    // mutate에 포함된 데이터가 mutationFn 첫번째 인자로 들어감
  };

  return (
    <div className="flex flex-col h-full w-full max-w-screen-xl mx-auto py-8 px-4">
      {/* 에디터 내부 이미지 스타일링 */}
      <style>{`.ql-editor img { max-width: 100%; height: auto; display: block; margin: 10px 0; }`}</style>

      <Card className="h-full shadow-lg border-gray-100 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold text-slate-900">새 여행기 작성</CardTitle>
          <CardDescription className="text-slate-500">최적화된 이미지 업로드 시스템이 적용되었습니다.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="text-lg py-6"
            />
            <div className="h-[500px] mb-12">
              <ReactQuill
                ref={quillRef}
                value={content}
                onChange={setContent}
                modules={modules}
                theme="snow"
                className="h-full"
                placeholder="여행의 추억을 기록해보세요..."
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isPending} className="bg-sky-500 px-8 py-6 text-lg">
                {isPending ? <Loader2 className="mr-2 animate-spin" /> : <Save className="mr-2" />}
                저장하기
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

