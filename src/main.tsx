import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./app/styles/global.css";
// 💡 QueryCache를 함께 사용하기 위해 임포트에 추가합니다.
import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import "./index.css";

// 배포 환경에서 console.log, console.warn, console.error를 무력화합니다.
// ✨ 전역 에러 핸들링 허브가 장착된 QueryClient 설정
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // useQuery들의 meta 속성에 onError가 등록되어 있다면 여기서 캐치해서 대신 실행해줍니다.
      if (query.meta?.onError) {
        (query.meta.onError as (error: any) => void)(error);
      }
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  // </StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);