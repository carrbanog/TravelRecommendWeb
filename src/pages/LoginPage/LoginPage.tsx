import { AuthLayout } from "../../shared/ui/AuthLayout/AuthLayout";
import { LoginForm } from "../../features/auth/login/ui/LoginForm";

export const LoginPage = () => {
  return (
    <AuthLayout
      title="로그인"
      linkDescription="계정이 없으신가요?"
      linkText="회원가입하기"
      linkTo="/signup"
    >
      <LoginForm />
    </AuthLayout>
  );
};
