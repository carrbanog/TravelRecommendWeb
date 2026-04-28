import { useWeatherQuery } from "../../../entities/weather/api/weatherApi";

export const WeatherWidget = () => {
  const { data, isLoading } = useWeatherQuery("Seoul");
  console.log("WeatherWidget Data:", data, isLoading);
  return(
    <div>
      weather
    </div>
  )
}