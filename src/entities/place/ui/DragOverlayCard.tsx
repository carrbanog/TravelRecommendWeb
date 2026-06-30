import { ListCardUI } from "./ListCardUI";
import type { NearPlace } from "../../../shared/types/nearPlaceType";

type SelectedPlace = Pick<NearPlace, "title" | "nearCoordinates" | "placeId">;

interface DragOverlayCardProps {
  place: SelectedPlace;
}

export const DragOverlayCard = ({ place }: DragOverlayCardProps) => {
  return (
    <div className="w-48 transform scale-105 rotate-3 opacity-90 shadow-2xl transition-transform select-none">
      <ListCardUI
        place={place}
        onRemovePlace={() => {}} // 오버레이 카드에서는 삭제 버튼이 동작할 필요가 없음
        isDragging={false}       // 오버레이 자체는 숨겨지면 안 되므로 false 고정
      />
    </div>
  );
};