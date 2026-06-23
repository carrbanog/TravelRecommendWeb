import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/signupApi";
import type { UserData } from "../../../../shared/types/usertype";
import { AUTH_ENDPOINTS } from "../../../../shared/api/endpoints";
import { toast } from "sonner";
export const useSignup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [name, setName] = useState<string>("");

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !passwordConfirm) {
      toast.error("입력 오류", { description: "모든 빈칸을 채워주세요." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("입력 오류", {
        description: "올바른 이메일 형식을 입력해주세요.",
      });
      return;
    }

    if (password !== passwordConfirm) {
      toast.error("비밀번호 불일치", {
        description: "비밀번호가 서로 맞지 않습니다.",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("비밀번호 취약", {
        description: "비밀번호는 최소 6자리 이상이어야 합니다.",
      });
      return;
    }

    try {
      const response = await signUp({
        name,
        email,
        password,
        passwordConfirm,
      } as UserData);

      toast.success("회원가입 성공 🎉", {
        description: response.message || "회원가입이 완료되었습니다.",
      });

      navigate(AUTH_ENDPOINTS.LOGIN);
    } catch (error: any) {
      console.log("서버 요청 중 오류 발생: ", error);
      toast.error("회원가입 실패", {description: error.customMessage });
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    handleSignup,
  };
};
