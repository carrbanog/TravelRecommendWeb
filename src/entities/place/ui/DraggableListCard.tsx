import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { NearPlace } from "../../../shared/types/nearPlaceType";
import { MdDelete } from "react-icons/md";
import { useSelectedPlacesStore } from "../model/selectedPlacesStore";

// NearPlace 타입에서 필요한 속성만 사용하도록 Pick 타입을 정의합니다.
type SelectedPlace = Pick<NearPlace, "title" | "nearCoordinates" | "placeId">; 

type DraggableListCardProps = {
  place: SelectedPlace;
  onRemove: (place: string) => void;
};

export const DraggableListCard = ({
  place,
  onRemove,
}: DraggableListCardProps) => {
  const selectPlace = useSelectedPlacesStore((s) => s.selectedPlaces)
  // dnd-kit의 useDraggable 훅을 사용하여 드래그 기능을 활성화합니다.
  // place.contentid를 id로 사용하여 각 아이템이 고유하게 식별되도록 합니다.
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: place.placeId, // 고유한 ID를 사용합니다.
    data: {
      place: place, // onDragEnd에서 사용할 데이터
      from: "SelectedListCard", // 드래그가 시작된 위치를 식별하기 위한 정보
    },
  });

  // 드래그 중일 때 시각적 피드백을 위한 스타일
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.6 : 1, 
    zIndex: isDragging ? 100 : "auto", 
    boxShadow: isDragging ? "0px 8px 16px rgba(0,0,0,0.2)" : "0px 4px 8px rgba(0,0,0,0.1)", 
    transition: "box-shadow 0.2s ease-in-out",
  };

  return (
    <div
      ref={setNodeRef} // 이 DOM 노드가 드래그 가능한 요소임을 dnd-kit에 알립니다.
      style={style}
      {...listeners} // 드래그 시작을 위한 이벤트 리스너 (onMouseDown, onTouchStart 등)
      {...attributes} // 접근성 관련 속성 (role="button" 등)
      className="bg-gradient-to-r from-slate-100 to-slate-200 shadow-lg rounded-2xl p-4 transition-all cursor-grab" // 드래그 가능함을 나타내는 cursor
    >
      <div className="flex justify-between items-center mb-2">
        <button
          className="text-gray-400 hover:text-red-500 transition"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => {
            onRemove(place.placeId);
            console.log(selectPlace)
          }}
          aria-label={`${place.title} 삭제`}
        >
          <MdDelete />
        </button>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 truncate">
        {place.title}
      </h3>
    </div>
  );
};