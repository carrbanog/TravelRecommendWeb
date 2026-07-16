import { useState, useEffect, useMemo } from "react";
import { useNearbyPlacesQuery } from "@/features/find-nearby-places/lib/useNearByPlacesQuery";
import { useSelectedPlacesStore } from "@/entities/place/model/selectedPlacesStore";
import type { SearchParams, SearchType } from "@/entities/place/model/type";

export const useTravelPageState = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<SearchType>("place");

  // Zustand 스토어에서 캐싱(백업)용 상태 가져오기
  const rememberedData = useSelectedPlacesStore((s) => s.rememberedData);
  const setRememberedData = useSelectedPlacesStore((s) => s.setRememberedData);

  // 1. API 호출
  const { data: nearbyData, isLoading } = useNearbyPlacesQuery({
    query: searchQuery,
  });

  const currentData = nearbyData || rememberedData;

  // 2. 탭 선택에 따른 노출 데이터 계산 (Memoization)
  const displayPlaces = useMemo(() => {
    if (activeTab === "place") return currentData?.places || [];
    if (activeTab === "hotel") return currentData?.hotels || [];
    return [];
  }, [activeTab, currentData]);

  // 3. API 원본 데이터 백업 처리 (Effect)
  useEffect(() => {
    if (nearbyData) {
      setRememberedData(nearbyData);
    }
  }, [nearbyData, setRememberedData]);

  // 4. 검색 핸들러
  const handlePlaceSearch = (params: SearchParams) => {
    setSearchQuery(params.query);
  };

  return {
    activeTab,
    setActiveTab,
    displayPlaces,
    isLoading,
    handlePlaceSearch,
  };
};