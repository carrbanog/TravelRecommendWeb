import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSelectedPlacesStore } from '../../entities/selected-place/model/selectedPlacesStore';
import type { NearPlace } from '../../shared/types/nearPlaceType';

type SortablePlaceCardProps = {
  id: string;
  idx: number;
  title: NearPlace;
};

export const SortableItem = ({
  id,
  idx,
  title,
}: SortablePlaceCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const removePlace = useSelectedPlacesStore((s) => s.removePlace)

  return (
    <div
      ref={setNodeRef} // 🔹 필수
      {...attributes} // 🔹 접근성
      {...listeners} // 🔹 이벤트 연결
      style={style} // 🔹 이동 스타일 적용
      className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-md p-4 transition-all cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">#{idx + 1}</span>
        <button className="text-gray-400 hover:text-red-500 transition" onClick={() => removePlace(title)}>
          ✕
        </button>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 truncate">{title.title}</h3>
    </div>
  );
};
