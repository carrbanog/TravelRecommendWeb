import React from 'react';
import { useWeatherQuery } from "../../../entities/weather/api/weatherApi";

interface WeatherCardProps {
  cityName: string;  // API 요청용 영문 이름 (예: "Seoul")
  label: string;     // 화면 표시용 이름 (예: "서울")
  bgImage: string;   // 도시 배경 이미지 URL
}

// 각 도시의 날씨 정보를 보여주는 카드 컴포넌트
export const WeatherCard = ({ cityName, label, bgImage }: WeatherCardProps) => {
  const { data: weatherData, isLoading, isError } = useWeatherQuery(cityName);

  // 로딩 상태: 스켈레톤 UI로 부드럽게 처리
  if (isLoading) {
    return (
      <div className="h-44 w-full animate-pulse rounded-3xl bg-gray-200" />
    );
  }

  // 에러 발생 시 처리
  if (isError || !weatherData) {
    return (
      <div className="flex h-44 w-full items-center justify-center rounded-3xl bg-gray-100 text-sm text-gray-400">
        날씨 정보를 불러올 수 없습니다.
      </div>
    );
  }

  // 날씨 아이콘 URL 생성
  const iconCode = weatherData.weather[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div
      className="group relative h-44 w-full cursor-pointer overflow-hidden rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      {/* 배경 이미지와 다크 오버레이 */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* 카드 내부 콘텐츠 */}
      <div className="relative z-20 flex h-full flex-col justify-between p-5 text-white">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-medium tracking-widest uppercase opacity-80">
              {cityName}
            </span>
            <h3 className="text-2xl font-bold tracking-tight">{label}</h3>
          </div>
          
          {/* 날씨 아이콘 (유리 보드 효과) */}
          <div className="rounded-2xl bg-white/20 backdrop-blur-md p-1">
            <img src={iconUrl} alt="weather status" className="w-12 h-12" />
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-4xl font-black">
              {Math.round(weatherData.main.temp)}°
            </span>
            <span className="text-sm font-medium opacity-90">
              체감 {Math.round(weatherData.main.feels_like)}°
            </span>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-semibold capitalize">
              {weatherData.weather[0]?.description}
            </p>
            <p className="text-[10px] opacity-70">
              H: {Math.round(weatherData.main.temp_max)}° L: {Math.round(weatherData.main.temp_min)}°
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};