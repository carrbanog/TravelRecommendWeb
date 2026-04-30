import { WeatherCard } from "@/entities/weather/ui/WeatherCard";

// 메인에 노출할 주요 도시 리스트
const FEATURED_CITIES = [
  { id: 1, name: "Seoul", label: "서울", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=500" },
  { id: 2, name: "Tokyo", label: "도쿄", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=500" },
  { id: 3, name: "Paris", label: "파리", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=500" },
  { id: 4, name: "New York", label: "뉴욕", image: "https://images.openweathermap.org/img/wn/10d@2x.png" }, // 아이콘 대체 가능
];

// 메인 페이지에 노출할 날씨 위젯 컴포넌트
export const WeatherWidget = () => {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">지금 떠나기 좋은 여행지 날씨 ✈️</h2>
        <span className="text-sm text-gray-500 underline cursor-pointer">더보기</span>
      </div>
      
      {/* 가로 스크롤 가능하게 배치 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {FEATURED_CITIES.map((city) => (
          <WeatherCard key={city.id} cityName={city.name} label={city.label} bgImage={city.image} />
        ))}
      </div>
    </section>
  );
};
