import { useLogin } from "@/features/auth/login/model/useLogin"; 

// Shadcn UI Components

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

export const LoginForm = () => {
  // useLogin 훅에서 상태와 핸들러를 가져옵니다.

  const { email, setEmail, password, setPassword, handleLogin } = useLogin();

  return (
<form onSubmit={handleLogin} className="space-y-6">
      <fieldset className="space-y-6 border-none p-0 m-0">
        <legend className="sr-only">로그인 정보 입력</legend>

        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

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
      </fieldset>

      <Button type="submit" className="w-full">
        로그인
      </Button>
    </form>
  );
};
