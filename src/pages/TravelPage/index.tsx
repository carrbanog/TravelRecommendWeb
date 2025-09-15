import TravelMap from "../../features/travel/ui/TravelMap";

export const TravelPage = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h1 style={{ textAlign: "center", padding: "16px" }}>여행지 추천 지도</h1>
      <TravelMap />
    </div>
  );
};
