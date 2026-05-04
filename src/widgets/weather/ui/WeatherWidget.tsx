// 1. 외부 라이브러리 (React 및 외부 라이브러리)
import { useState } from 'react';

// 2. Shared 레이어 (공통 UI 및 상수)
import MyMap from "@/shared/ui/GoogleMap/MyMap";
import { TARGET_CITIES } from "@/shared/constants/city";

// 3. 현재 위젯의 내부 UI 컴포넌트 (동일 폴더 내)
import { WeatherMarker } from './WeatherMarker';
import { WeatherInfoWindow } from './WeatherInfoWindow';

export const WeatherWidget = () => {

  const [selectedCity, setSelectedCity] = useState<typeof TARGET_CITIES[0] | null>(null);
  console.log("selectedCity", selectedCity);

  return (
    <section className="max-w-screen-2xl mx-auto my-12 px-6">
      <h2 className="text-2xl font-bold mb-4">세계 날씨 지도</h2>
      <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
        <MyMap place={undefined}>
          {TARGET_CITIES.map((city) => (
            <WeatherMarker city={city} key={city.id} onSelect={() => setSelectedCity(city)} />
          ))}
          {selectedCity && (
            <WeatherInfoWindow city={selectedCity} onClose={() => setSelectedCity(null)} />
          )}
        </MyMap>
      </div>
    </section>
  );
};
