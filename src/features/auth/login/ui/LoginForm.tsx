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
        <Label htmlFor="email">이메일</Label>

        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* 비밀번호 입력 필드 */}

      <div className="space-y-2">
        <Label htmlFor="password">비밀번호</Label>

        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* 로그인 제출 버튼 (Blue Point) */}

      <Button type="submit" className="w-full">
        로그인
      </Button>
    </form>
  );
};
