import { FlightSearchForm } from "@/features/flight-search/ui/FlightSearchForm";
import { PopularPosts } from '@/widgets/popular-posts/ui/PopularPosts';

export const MainPage = () => {
  return (
    <div>
      <FlightSearchForm />
      <PopularPosts />
    </div>
  );
};
