import { useWeatherQuery } from '@/entities/weather/api/weatherApi';
import { MarkerF } from '@react-google-maps/api';
import { useMemo } from 'react';

type WeatherMarkerProps = {
  city: {name: string, lat: number, lng: number};
  onSelect: () => void;
}

// 각 도시의 위치에 날씨 아이콘을 표시하는 Marker 컴포넌트
export const WeatherMarker = ({city, onSelect}: WeatherMarkerProps) => {
  const {data} = useWeatherQuery(city.name)
  const markerIcon = useMemo(() => {
    if (!data || !window.google) return undefined;
    
    return {
      url: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      scaledSize: new window.google.maps.Size(44, 44),
      anchor: new window.google.maps.Point(22, 22),
    };
  }, [data]);
  
  return(
    <MarkerF position={{ lat: city.lat, lng: city.lng }} icon={markerIcon} onClick={onSelect}/>
  )
}