import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const handelSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password, passwordConfirm);

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
        passwordConfirm,
      });
      console.log("서버응답: ", response);
    } catch (error) {
      console.error("서버 요청 중 오류 발생: ", error);
    }
  };

  return (
    <div className="min-h-[calc(100dvh-100px)] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-16 px-6 sm:px-8 lg:px-10">
      <div className="max-w-2xl w-full space-y-10">
        {/* 헤더 영역 */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
            <span className="text-4xl">✈️</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-2">회원가입</h2>
          <p className="text-slate-600 text-base">
            TravelDream과 함께 여행을 시작하세요
          </p>
        </div>

        {/* 폼 영역 */}
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <form className="space-y-7" onSubmit={handelSignup}>
            <div>
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

            <div>
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

            <div>
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

            <div>
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

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 px-5 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              회원가입
            </button>
          </form>

          {/* 로그인 링크 */}
          <div className="mt-7 text-center">
            <p className="text-slate-600">
              이미 계정이 있으신가요?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
              >
                로그인하기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
