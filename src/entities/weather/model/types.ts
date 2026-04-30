// openweathermap API 응답 구조에 맞는 타입 정의
export type WeatherData = {
  main:{
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
  },
  weather:{
    id: number;
    main: string;
    description: string;
    icon: string;
  }[],
  name: string;
}
