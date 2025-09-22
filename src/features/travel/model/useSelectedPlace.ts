import { useState, useEffect } from "react";

export const useSelectedPlace = () => {
  const [selectedPlaces, setSelectedPlaces] = useState<
    { name: string; coordinates: [number, number] }[]
  >([]);

  useEffect(() => {
    const savedPlace = localStorage.getItem("selectedPlace");
    if (savedPlace) {
      setSelectedPlaces(JSON.parse(savedPlace));
    }
  }, []);

  const addPlace = (place: { name: string; coordinates: [number, number] }) => {
    setSelectedPlaces((prev) => {
      const updated = [...prev, place];
      localStorage.setItem("selectedPlace", JSON.stringify(updated));
      return updated;
    });
    console.log(selectedPlaces);
  };

  //위치 배열 삭제제
  const removePlace = (idx: number) => {
    console.log(idx);
    console.log(selectedPlaces);
    setSelectedPlaces((prev) => {
      const updated = prev.filter((place) => place !== selectedPlaces[idx]);
      localStorage.setItem("selectedPlace", JSON.stringify(updated));
      return updated; //selectedPlace를 updated로 교체
    });
  };

  return { selectedPlaces, addPlace, removePlace };
};
