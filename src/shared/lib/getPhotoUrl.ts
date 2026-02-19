// api에서 받아온 photoReference를 이용해 Google Places API에서 사진 URL을 생성하는 함수
export const getPhotoUrl = (photoReference: string) => {
  if (!photoReference) return ""; // photoReference가 없을 경우 빈 문자열 반환
  const apiKey = import.meta.env.VITE_GOOGLE_MAP;
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
};
