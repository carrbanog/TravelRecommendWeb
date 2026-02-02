import { Description } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Link } from "react-router-dom";

type AuthLayoutProps = {
  mode?: "login" | "signup";
  title: string;
  children: React.ReactNode;
  // linkText: string;
  // linkUrl: string;
  description: string;
};

export const AuthLayout = ({
  title,
  children,
  // linkText,
  // linkUrl,
  description,
  mode,
}: AuthLayoutProps) => {
  return (
    <div className="flex w-full h-[calc(100vh-5rem)] overflow-hidden">
      {/* 왼쪽 영역 */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-10">
        {/* 로그인, 회원가입 탭 버튼 */}
        <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-md bg-gray-100 rounded-md p-1">
          <Link
            to="/login"
            className={`flex items-center justify-center py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
              mode === "login"
                ? "bg-white text-slate-900 shadow-sm" // 로그인 활성 스타일
                : "text-slate-900 hover:text-slate-700"
            }`}
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className={`flex items-center justify-center py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
              mode === "signup"
                ? "bg-white text-slate-900 shadow-sm" // 회원가입 활성 스타일
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            회원가입
          </Link>
        </div>
        <div className="w-full max-w-md space-y-8">
          {/* 헤더 (제목/설명) */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-sm text-gray-500 mt-2">{description}</p>
            )}
          </div>
          {/* 로그인폼 */}
          {children}
        </div>
      </div>
      <div className="md:w-1/2 md:block hidden">
        <img
          src="../../../../public/img/login/loginBackground.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
