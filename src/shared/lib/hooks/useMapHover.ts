// 지도에서 마커에 마우스를 올렸을 때 해당 장소의 정보를 보여주는 훅입니다.
import { useState, useRef, useCallback } from "react";

export const useMapHover = (delay = 400) => {
  const [hoveredPlace, setHoveredPlace] = useState<string | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseOver = useCallback((placeId: string) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => setHoveredPlace(placeId), delay);
  }, [delay]);

  const handleMouseOut = useCallback(() => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setHoveredPlace(null);
  }, []);

  return { hoveredPlace, handleMouseOver, handleMouseOut, setHoveredPlace };
};