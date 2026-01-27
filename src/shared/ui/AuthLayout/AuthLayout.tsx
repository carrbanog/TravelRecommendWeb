import { Description } from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";

type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
  linkText: string;
  linkUrl: string;
  description: string;
};

export const AuthLayout = ({
  title,
  children,
  linkText,
  linkUrl,
  description,
}: AuthLayoutProps) => {
  return (
    <div className="flex w-full h-[calc(100vh-5rem)] overflow-hidden">
      {/* 왼쪽 영역 */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-10">
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

          {/* 하단 링크 */}
          {linkText && linkUrl && (
            <div className="text-center">
              <Link
                to={linkUrl}
                className="text-sm text-blue-500 hover:underline"
              >
                {linkText}
              </Link>
            </div>
          )}
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
