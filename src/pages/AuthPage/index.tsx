import { AuthLayout } from "@/shared/ui/AuthLayout/AuthLayout";
import { LoginForm } from "@/features/auth/login/ui/LoginForm";
import { SignupForm } from "@/features/auth/signup/ui/SignupForm";
import { useLocation } from "react-router-dom";

export const AuthPage = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  // console.log("AuthPage rendered. isLoginPage:", location.pathname)  ;
  const pageConfig = {
    login: {
      mode: "login" as const,
      title: "Welcome back",
      description: "다시 오신 것을 환영합니다! 여행을 시작해보세요.",
      FormComponent: <LoginForm />,
    },
    signup: {
      mode: "signup" as const,
      title: "Create your account",
      description: "여행을 함께할 계정을 만들어보세요!",
      FormComponent: <SignupForm />,
    },
  };
  const currentPageConfig = isLoginPage ? pageConfig.login : pageConfig.signup;
  return (
    <AuthLayout
      mode={currentPageConfig.mode}
      title={currentPageConfig.title}
      description={currentPageConfig.description}
    >
      {currentPageConfig.FormComponent}
    </AuthLayout>
  );
};
