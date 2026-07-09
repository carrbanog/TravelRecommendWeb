export const MapSkeleton = () => {
  return (
    <div className="w-full h-full min-h-[400px] bg-slate-100 rounded-lg animate-pulse relative overflow-hidden flex flex-col justify-between p-5">
      
      {/* 1. 상단: 검색창 혹은 컨트롤바 영역 모의 스켈레톤 */}
      <div className="w-full flex gap-2 z-10">
        <div className="h-10 bg-slate-200 rounded-md w-48 shadow-sm"></div>
        <div className="h-10 bg-slate-200 rounded-md w-20 shadow-sm"></div>
      </div>

      {/* 2. 중앙: 지도 로딩을 나타내는 텍스트 및 스피너 영역 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        {/* 부드럽게 회전하는 인디케이터 (선택 사항) */}
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-400 rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-400">지도를 불러오는 중입니다...</p>
      </div>

      {/* 3. 하단: 지도 우측 하단 컨트롤러 버튼들 모의 스켈레톤 */}
      <div className="flex flex-col gap-2 items-end justify-end w-full z-10">
        <div className="w-9 h-9 bg-slate-200 rounded-md shadow-sm"></div>
        <div className="w-9 h-9 bg-slate-200 rounded-md shadow-sm"></div>
      </div>

    </div>
  );
};