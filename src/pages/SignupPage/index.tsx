import { AuthLayout } from "../../shared/ui/AuthLayout/AuthLayout";
import { SignupForm } from "../../features/auth/signup/ui/SignupForm";

export const SignupPage = () => {
  return (
    <AuthLayout
      title="회원가입"
      linkDescription="이미 계정이 있으신가요?"
      linkText="로그인하기"
      linkTo="/login"
    >
      <SignupForm />
    </AuthLayout>
  );
};
