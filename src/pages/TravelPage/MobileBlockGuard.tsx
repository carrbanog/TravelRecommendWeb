import { useNavigate } from "react-router-dom";

export const MobileBlockGuard = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-6 text-center bg-slate-50">
      <div className="max-w-md p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
        <span className="text-4xl" role="img" aria-label="desktop">💻</span>
        <h1 className="mt-4 text-xl font-bold text-slate-900">
          데스크톱에 최적화된 페이지입니다
        </h1>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          죄송합니다. 여행 경로 찾기(지도) 기능은 드래그, 마커 탐색 등 큰
          화면의 UX에 최적화되어 있어 현재 PC 환경에서만 지원하고 있습니다.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white h-11 transition-colors"
        >
          메인 페이지로 돌아가기
        </button>
      </div>
    </main>
  );
};