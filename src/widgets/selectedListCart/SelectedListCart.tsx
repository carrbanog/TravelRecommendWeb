import type { NearPlace } from '../../shared/types/nearPlaceType';

type SelectedPlace = Pick<NearPlace, 'title' | 'nearCoordinates'>; //NearPlace랑 구조는 같지만 이름이 다르니 따로 선언

type SelectedListCardProps = {
  selectedPlaces: SelectedPlace[]
}


export const SelectedListCard = ({selectedPlaces}:SelectedListCardProps) => {
  return (
    <section className="flex-1 basis-[70%] overflow-y-auto p-6 border-b border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedPlaces.map((place, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-md p-4 transition-all cursor-grab active:cursor-grabbing"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">#{idx + 1}</span>
              <button className="text-gray-400 hover:text-red-500 transition">
                ✕
              </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {place.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
