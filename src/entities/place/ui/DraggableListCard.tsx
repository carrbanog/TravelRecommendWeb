import { useDraggable } from "@dnd-kit/core";
import type { NearPlace } from "../../../shared/types/nearPlaceType";
import { ListCardUI } from "./ListCardUI"; // 분리된 UI 컴포넌트 유지

type SelectedPlace = Pick<NearPlace, "title" | "nearCoordinates" | "placeId">;

type DraggableListCardProps = {
  place: SelectedPlace;
  onRemovePlace: (place: string) => void;
};

const DRAGGING_STYLE = { opacity: 0 };

//useDraggable의 transform이랑 style의 transform은 별개

export const DraggableListCard = ({
  place,
  onRemovePlace,
}: DraggableListCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: place.placeId,
      data: { place, from: "SelectedListCard" },
    });

  console.log("DraggableListCard 렌더링", transform);

  // 드래그가 true로 변하면 undefined로 만들어서 기존 카드를 원래 자리에 고정
  const style = isDragging ? DRAGGING_STYLE : undefined;
  // const style = {
  //   opacity: isDragging ? 0 : undefined,
  // };
  return (
    <ListCardUI
      place={place}
      onRemovePlace={onRemovePlace}
      isDragging={isDragging}
      style={style}
      listeners={listeners}
      attributes={attributes}
      setNodeRef={setNodeRef}
    />
  );
};
