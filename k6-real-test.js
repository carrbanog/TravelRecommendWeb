import http from 'k6/http';
import { sleep } from 'k6';

// 🚨 k6가 확실하게 인식하는 표준 단축 옵션 포맷으로 수정했습니다.
export const options = {
  vus: 1000,          // 👥 동시에 접속할 가상 사용자 수 100명
  duration: '20s',   // ⏱️ 30초 동안 쉬지 않고 계속 요청을 보냄!
};

export default function () {
  const url = 'http://localhost:5000/nearbyplaces?query=%EC%8B%B1%EA%B0%80%ED%8F%B4';
  
  const res = http.get(url);

  console.log(`[k6] 가상 사용자 요청 완료 | 응답 코드: ${res.status}`);

  // 가상 사용자들이 요청을 보낸 후 0.1초~0.3초 정도 살짝 쉬고 다음 요청을 쏘게 만듭니다.
  sleep(Math.random() * 0.5 + 0.5); 
}