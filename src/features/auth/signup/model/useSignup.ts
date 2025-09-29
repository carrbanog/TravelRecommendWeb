import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/signupApi";
import axios from "axios";
import type { UserData } from "../../../../shared/types/usertype";
import { AUTH_ENDPOINTS } from "../../../../shared/api/endpoints";

export const useSignup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [name, setName] = useState<string>("");

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await signUp({
        name,
        email,
        password,
        passwordConfirm,
      } as UserData);
      alert(response.message);

      //회원가입 성공 시 로그인 페이지로 이동
      navigate(AUTH_ENDPOINTS.LOGIN);
    } catch (error) {
      console.error("서버 요청 중 오류 발생: ", error);
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      }
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
