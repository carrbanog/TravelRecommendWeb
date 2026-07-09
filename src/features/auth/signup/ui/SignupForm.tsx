import { useSignup } from "@/features/auth/signup/model/useSignup";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

export const SignupForm = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    handleSignup,
  } = useSignup();

  return (
<form onSubmit={handleSignup} className="space-y-6">
      <fieldset className="space-y-6 border-none p-0 m-0">
        <legend className="sr-only">회원가입 정보 입력</legend>

        <div className="space-y-2">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
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
            autoComplete="new-password"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
          <Input
            id="passwordConfirm"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
      </fieldset>

      <Button type="submit" className="w-full">
        회원가입
      </Button>
    </form>
  );
};
