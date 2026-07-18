// mock-google-server.js
import express from 'express';
import cors from 'cors'; // cors 에러 방지용

const app = express();
app.use(cors());

const PORT = 5001;

// 1. 지오코딩 API Mock (주소를 넣으면 가짜 좌표를 반환)
app.get('/maps/api/geocode/json', (req, res) => {
  const address = req.query.address;
  console.log(`📡 [가짜 구글 지오코더] 주소 수신: "${address}"`);

  res.json({
    status: "OK",
    results: [
      {
        geometry: {
          location: {
            lat: 1.3521, // 싱가포르 기본 좌표 예시
            lng: 103.8198
          }
        }
      }
    ]
  });
});

// 2. Nearby Search API Mock (좌표를 기반으로 관광지/호텔 반환)
app.get('/maps/api/place/nearbysearch/json', (req, res) => {
  const { location, type } = req.query;
  console.log(`📡 [가짜 구글 플레이스] 주변 장소 요청 수신: 좌표(${location}), 타입(${type})`);

  // 요청받은 타입에 맞는 가짜 데이터 생성
  const namePrefix = type === "lodging" ? "가상 호텔" : "가상 명소";
  const mockPlaces = Array.from({ length: 20 }, (_, i) => ({
    place_id: `mock_${type}_${i}`,
    name: `${namePrefix} ${i + 1}`,
    geometry: {
      location: {
        lat: 1.3521 + (Math.random() - 0.5) * 0.02,
        lng: 103.8198 + (Math.random() - 0.5) * 0.02
      }
    },
    rating: (Math.random() * 2 + 3).toFixed(1),
  }));
  console.log("가상 서버 돌아가는중")
  res.json({
    results: mockPlaces,
    status: "OK"
  });
});

app.listen(PORT, () => {
  console.log(`🟢 [비용 0원] 가짜 구글맵 API 서버가 포트 ${PORT}에서 정상 작동 중입니다!`);
});