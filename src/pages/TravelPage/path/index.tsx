// src/pages/travel/TravelPathPage.tsx
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { SelectedListCard } from "../../../entities/selected-place/ui/SelectedListCard";
import { PlanCardList } from "../../../entities/selected-place/ui/PlanCardList";
import { useSelectedPlacesStore } from "../../../entities/selected-place/model/selectedPlacesStore";
import { useTravelPlanStore } from "../../../entities/travel-plan/model/useTravelPlanStore";
import { useNavigate } from "react-router-dom";
import { usePlanCardsStore } from "../../../entities/travel-plan/model/usePlanCardsStore";
import { handleDragEnd } from "../../../features/travel/travel-path/lib/handleDragEnd";
import MyMap from "../../../shared/ui/GoogleMap/MyMap";
import { Marker, Polyline } from "@react-google-maps/api";

const TravelPathPage = () => {
  const selectedPlaces = useSelectedPlacesStore((s) => s.selectedPlaces);
  const setCenter = useSelectedPlacesStore((s) => s.setCenter);
  const tripDays = useTravelPlanStore((s) => s.tripDays);
  const { planCards, initialize } = usePlanCardsStore();
  const [path, setPath] = useState(false);
  const colors = ["#FF0000", "#007BFF", "#00C851", "#FF8800"];

  const navigate = useNavigate();

  useEffect(() => {
    initialize(tripDays);
  }, []);
  console.log(planCards);

  // 지도 중심값 / 새로고침 시 이동 처리
  useEffect(() => {
    if (selectedPlaces.length > 0) {
      setCenter(selectedPlaces[0].nearCoordinates);
    } else {
      navigate("/travel", { replace: true });
    }
  }, [selectedPlaces, setCenter, navigate]);

  // dnd-kit 센서 (PointerSensor 사용)
  const sensors = useSensors(useSensor(PointerSensor)); //마우스 감지

  return (
  <>
    {!path ? (
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="w-[80%] h-[85%] bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden">
            <SelectedListCard selectedPlaces={selectedPlaces} />
            <PlanCardList />
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setPath(true)}
              className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-4 self-center"
            >
              동선 보기
            </button>
          </div>
        </div>
      </DndContext>
    ) : (
      <div className="w-screen h-screen">
        <MyMap place={selectedPlaces[0].nearCoordinates}>
          {selectedPlaces.map((place) => (
            <Marker
              key={place.placeId}
              position={place.nearCoordinates}
              title={place.title}
            />
          ))}
                {planCards.map((card, idx) => {
        const pathCoordinates = card.places
          ?.map((p) => p.nearCoordinates)
          .filter(Boolean);

        return (
          pathCoordinates &&
          pathCoordinates.length > 1 && (
            <Polyline
              key={card.id}
              path={pathCoordinates}
              options={{
                strokeColor: colors[idx % colors.length],
                strokeWeight: 4,
              }}
            />
          )
        );
      })}
        </MyMap>

        <button
          onClick={() => setPath(false)}
          className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md"
        >
          돌아가기
        </button>
      </div>
    )}
  </>
  );
};

export default TravelPathPage;
