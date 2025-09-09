import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthButton } from "../../shared/ui/AuthButton/AuthButton";
import { AuthLayout } from "../../shared/ui/AuthLayout/AuthLayout";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../features/auth/signup/signupApi";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handelSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await signUp({ name, email, password, passwordConfirm });
      console.log("서버응답: ", response);
      alert(response.data.message);

      //회원가입 성공 시 로그인 페이지로 이동
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("서버 요청 중 오류 발생: ", error);
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <AuthLayout
      title="회원가입"
      linkDescription="이미 계정이 있으신가요?"
      linkText="로그인하기"
      linkTo="/login"
    >
      <form onSubmit={handelSignup}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            이름
          </label>
          <input
            id="name"
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-slate-400"
            required
          />
        </div>

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

        <div className="mb-8">
          <label
            htmlFor="passwordConfirm"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            비밀번호 확인
          </label>
          <input
            id="passwordConfirm"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full px-5 py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-slate-400"
            required
          />
        </div>
        <AuthButton>회원가입</AuthButton>
      </form>
    </AuthLayout>
  );
};
