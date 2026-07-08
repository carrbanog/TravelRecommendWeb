import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@/features/auth/login/api/loginApi";
import { useAuth } from "@/app/providers/AuthProvider";
import type { LoginResponse } from "@/features/auth/login/model/type";
import { toast } from "sonner";
import axios from "axios"; // 🔥 Axios 에러 타입 검증을 위해 임포트 추가

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. 공백 검증 (클라이언트 사이드 가드)
    if (!email.trim() || !password) {
      toast.error("입력 오류", { description: "모든 빈칸을 채워주세요." });
      return;
    }

    // 2. 이메일 형식 검증 (클라이언트 사이드 가드)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("입력 오류", {
        description: "올바른 이메일 형식을 입력해주세요.",
      });
      return;
    }

    try {
      const response: LoginResponse = await loginApi({ email, password });
      const userDoc = response.userDoc;

      login({
        name: userDoc.username,
        email: userDoc.email,
      });

      toast.success(response.message || "로그인이 완료되었습니다.",{
        position: "top-right",
      });

      navigate("/");
    } catch (error: any) {
      console.error("🚨 로그인 요청 실패:", error);

      // 최악의 상황을 대비한 fallback 메시지 세팅 (로그인 문구로 수정)
      let errorMessage =
        "로그인 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
          // 💡 서버가 다운되었거나 인터넷이 끊긴 네트워크 에러 처리
          errorMessage =
            "서버와 연결할 수 없습니다. 인터넷 연결 상태를 확인해주세요.";
        }
      }

      // 깔끔하게 정리된 하나의 errorMessage 변수만 토스트에 바인딩합니다.
      toast.error("로그인 실패 ❌", {
        description: errorMessage,
      });
    }
  };

  return { email, setEmail, password, setPassword, handleLogin };
};
