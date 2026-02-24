// 지도에서 마커에 마우스를 올렸을 때 해당 장소의 정보를 보여주는 훅입니다.
import { useState, useRef } from "react";
import type { NearPlace } from "../../../shared/types/nearPlaceType"

export const useMapHover = (delay = 400) => {
  const [hoveredPlace, setHoveredPlace] = useState<NearPlace | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseOver = (place: NearPlace) => {
    console.log("handleMouseOver called with place:", place);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => setHoveredPlace(place), delay);
  };

  const handleMouseOut = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setHoveredPlace(null);
  };

  return { hoveredPlace, handleMouseOver, handleMouseOut, setHoveredPlace };
};