import { InfoWindowF } from '@react-google-maps/api';
import { useWeatherQuery } from '@/entities/weather/api/weatherApi';

type WeatherInfoWindowProps = {
  city: { name: string; lat: number; lng: number };
  onClose: () => void; // ✅ 부모의 상태를 변경할 함수를 props로 받음
};

// 아이콘을 클릭하면 해당 도시의 날씨 정보를 보여주는 InfoWindow 컴포넌트
export const WeatherInfoWindow = ({ city, onClose }: WeatherInfoWindowProps) => {
  // marker에서도 쿼리를 사용해서 부모에서 사용해도 좋지만 fsd구조상 각 컴포넌트가 독립적으로 데이터를 가져오는게 더 깔끔할 것 같아서 이렇게 했습니다.
  const { data, isLoading } = useWeatherQuery(city.name);

  if (isLoading) return null;
  if (!data) return null;

  return (
    <InfoWindowF 
      position={{ lat: city.lat, lng: city.lng }} 
      onCloseClick={onClose} // ✅ 여기서 onClose를 호출해야 에러 없이 창이 닫힘
    >
      {/* 스타일을 위한 div 컨테이너 추가 */}
      <div className="p-2 min-w-[150px] text-gray-800">
        <h3 className="text-sm font-bold text-blue-600 mb-1">{city.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black">{Math.round(data.main.temp)}°C</span>
          <img 
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} 
            alt="weather icon" 
            className="w-8 h-8"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1 capitalize">{data.weather[0].description}</p>
      </div>
    </InfoWindowF>
  );
};