import { AuthButton } from "../../../../shared/ui/AuthButton/AuthButton";
import { useLogin } from "../model/useLogin";

export const LoginForm = () => {
  const { email, setEmail, password, setPassword, handleLogin } = useLogin();
  return (
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
  );
};
