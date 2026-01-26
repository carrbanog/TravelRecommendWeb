import React from "react";
import { useLogin } from "../model/useLogin"; // 기존에 만드신 훅 경로

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const LoginForm = () => {
  // useLogin 훅에서 상태와 핸들러를 가져옵니다.
  const { email, setEmail, password, setPassword, handleLogin } = useLogin();

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {/* 이메일 입력 필드 */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-700 font-semibold">
          이메일
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          // shadcn 기본 스타일에 파란색 포커스 링 강조 추가
          className="h-12 px-4 bg-slate-50 border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0"
        />
      </div>

      {/* 비밀번호 입력 필드 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-slate-700 font-semibold">
            비밀번호
          </Label>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-12 px-4 bg-slate-50 border-slate-200 focus-visible:ring-blue-600 focus-visible:ring-offset-0"
        />
      </div>

      {/* 로그인 제출 버튼 (Blue Point) */}
      <Button
        type="submit"
        className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 transition-all hover:scale-[1.01]"
      >
        로그인
      </Button>
    </form>
  );
};
