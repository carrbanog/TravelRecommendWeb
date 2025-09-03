import { Link } from "react-router-dom";

type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
  linkText: string;
  linkTo: string;
  linkDescription: string;
};

export const AuthLayout = ({
  children,
  title,
  linkText,
  linkTo,
  linkDescription,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-[calc(100dvh-100px)] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-16 px-6 sm:px-8 lg:px-10">
      <div className="max-w-2xl w-full space-y-10">
        {/* 헤더 영역 */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
            <span className="text-4xl">✈️</span>
          </div>
          {/* 제목 */}
          <h2 className="text-4xl font-bold text-slate-800 mb-2">
            {title}
          </h2>{" "}
          {/* 설명 */}
          <p className="text-slate-600 text-base">
            TravelDream과 함께 여행을 시작하세요
          </p>
        </div>

        {/* 폼 영역 */}
        <div className="bg-white rounded-2xl shadow-xl p-10">
          {/* 폼 영역 렌더링 */}
          {children}
          <div className="mt-7 text-center">
            <p className="text-slate-600">
              {linkDescription}
              {""}
              <Link
                to={linkTo} //로그인 api 주소
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
              >
                {/* 링크 설명 */} {linkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
