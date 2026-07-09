import { FlightSearchForm } from "@/features/flight-search/ui/FlightSearchForm";
import { PopularPosts } from '@/widgets/popular-posts/ui/PopularPosts';
import { WeatherWidget } from '@/widgets/weather/ui/WeatherWidget';

export const MainPage = () => {
  return (
    <main>
      <FlightSearchForm />
      <PopularPosts />
      <WeatherWidget />
    </main>
  );
};
