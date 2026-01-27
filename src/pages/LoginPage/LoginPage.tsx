import { AuthLayout } from "../../shared/ui/AuthLayout/AuthLayout";
import { LoginForm } from "../../features/auth/login/ui/LoginForm";

export const LoginPage = () => {
  return (
    <AuthLayout
      title="Welcome back"
      description="다시 오신 것을 환영합니다! 여행을 시작해보세요."
      linkText="계정이 없으신가요? 회원가입"
      linkUrl="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
};
