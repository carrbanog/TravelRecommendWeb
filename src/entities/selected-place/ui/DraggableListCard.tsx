import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { NearPlace } from "../../../shared/types/nearPlaceType";
import { MdDelete } from "react-icons/md";

type DragableListCardProps = {
  id: string; // dnd-kit을 위한 고유 ID
  placeItem: NearPlace;
  onRemovePlace: (place: NearPlace) => void;
};

const DragableListCard = ({
  id,
  placeItem,
  onRemovePlace,
}: DragableListCardProps) => {
  // useDraggable 훅을 사용하여 드래그 기능을 활성화합니다.
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: {
      // 드래그가 끝났을 때(onDragEnd) 이 데이터를 사용할 수 있습니다.
      place: placeItem,
      from: 'SelectedList' // 어디에서 드래그가 시작되었는지 구분하기 위한 정보
    },
  });

  // 드래그 중일 때 아이템의 위치를 시각적으로 업데이트합니다.
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1, // 드래그 중일 때 반투명 효과
  };

  return (
    <li
      ref={setNodeRef} // 이 DOM 노드가 드래그 대상임을 dnd-kit에 알립니다.
      style={style}
      {...listeners} // 드래그를 시작하기 위한 이벤트 리스너(onMouseDown, onTouchStart 등)
      {...attributes} // 접근성 관련 속성
      className="flex justify-between items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition cursor-grab"
    >
      <span className="text-slate-700 font-medium">{placeItem.title}</span>
      <button
        onClick={(e) => {
          e.stopPropagation(); // 버튼 클릭 시 드래그가 시작되지 않도록 이벤트 전파를 막습니다.
          onRemovePlace(placeItem);
        }}
        aria-label={`${placeItem.title} 삭제`}
        className="text-red-500 hover:text-red-600 transition"
      >
        <MdDelete size={20} />
      </button>
    </li>
  );
};

export default DragableListCard;