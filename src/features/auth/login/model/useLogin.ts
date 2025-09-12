import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/loginApi";
import { useAuth } from "../../../../app/providers/AuthProvider";
import type { LoginResponse } from "./type";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: LoginResponse = await loginApi({ email, password });
      const userDoc = response.userDoc;
      console.log(userDoc.username);
      login({
        name: userDoc.username,
        email: userDoc.email,
      });
      console.log(login);
      alert(response.message);
      navigate("/");
    } catch (error: any) {
      console.error("서버 요청 중 오류 발생: ", error);
    }
  };
  return { email, setEmail, password, setPassword, handleLogin };
};
