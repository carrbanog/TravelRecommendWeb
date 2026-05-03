import MyMap from "@/shared/ui/GoogleMap/MyMap";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { WeatherMarker } from './WeatherMarker';
import { useState } from 'react';

const TARGET_CITIES = [
  { id: 1, name: "Seoul", lat: 37.5665, lng: 126.9780 },
  { id: 2, name: "Paris", lat: 48.8566, lng: 2.3522 },
  { id: 3, name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { id: 4, name: "New York", lat: 40.7128, lng: -74.0060 },
];

export const WeatherWidget = () => {

  const [selectedCity, setSelectedCity] = useState<typeof TARGET_CITIES[0] | null>(null);


  return (
    <section className="max-w-screen-2xl mx-auto my-12 px-6">
      <h2 className="text-2xl font-bold mb-4">세계 날씨 지도</h2>
      <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
        <MyMap>
          {TARGET_CITIES.map((city) => (
            <WeatherMarker city={city} key={city.id} />
          ))}
        </MyMap>
      </div>
    </section>
  );
};
