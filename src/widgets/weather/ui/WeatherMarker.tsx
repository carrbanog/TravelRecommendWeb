import { useWeatherQuery } from '@/entities/weather/api/weatherApi';
import { MarkerF } from '@react-google-maps/api';

type WeatherMarkerProps = {
  city: {name: string, lat: number, lng: number};
  // onSelect: () => void;
}

export const WeatherMarker = ({city,}: WeatherMarkerProps) => {
  const {data} = useWeatherQuery(city.name)
  console.log("날씨 데이터", data);
  
  return(
    <MarkerF position={{ lat: city.lat, lng: city.lng }}/>
  )
}