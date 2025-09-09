import { useState } from "react";
import axios from "axios";
import { AuthLayout } from "../../shared/ui/AuthLayout/AuthLayout";
import { AuthButton } from "../../shared/ui/AuthButton/AuthButton";
import { loginApi } from "../../features/auth/login/loginApi";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginApi({ email, password });
      console.log(response);
      const userDoc = response.data.userDoc;
      console.log(userDoc.username);
      login({
        name: userDoc.username,
        email: userDoc.email,
      });
      console.log(login);
      alert(response.data.message);

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("서버 요청 중 오류 발생: ", error);
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <AuthLayout
      title="로그인"
      linkDescription="계정이 없으신가요?"
      linkText="회원가입하기"
      linkTo="/signup"
    >
      {/* 로그인 폼 */}
      <form onSubmit={handleLogin}>
        {/* 아이디 입력 */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-slate-400"
            required
          />
        </div>

        {/* 비밀 번호 입력 */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-slate-400"
            required
          />
        </div>
        <AuthButton>로그인</AuthButton>
      </form>
    </AuthLayout>
  );
};
