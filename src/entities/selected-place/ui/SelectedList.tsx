import React from "react";
import type { NearPlace } from "../../../shared/types/nearPlaceType";

import { MdDelete } from "react-icons/md";

type SelectedListProps = {
  place?: NearPlace[];
  onRemovePlace: (place: string) => void;
};


//TravelPage에서 선택한 리스트들을 보여주는 코드
const SelectedList = React.memo(  ({ place, onRemovePlace }: SelectedListProps) => {
  console.log("SelectedList 렌더링:", { place });
  return (
    <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl shadow-lg p-4">
      <h2 className="text-lg font-semibold text-slate-700 mb-3">선택한 장소</h2>
      {place && place.length > 0 ? (
        <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
          {place.map((placeItem, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition"
            >
              <span className="text-slate-700 font-medium">
                {placeItem.title}
              </span>
              <button
                onClick={() => onRemovePlace(placeItem.placeId)}
                aria-label={`${placeItem.title} 삭제`}
                className="text-red-500 hover:text-red-600 transition"
              >
                <MdDelete size={20} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-sm">아직 선택된 장소가 없습니다.</p>
      )}
    </div>
  );
});


export default SelectedList;
