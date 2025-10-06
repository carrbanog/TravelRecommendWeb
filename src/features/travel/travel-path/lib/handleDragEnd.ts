import type { DragEndEvent } from "@dnd-kit/core";
import type { PlanCard } from '../../../../entities/selected-place/model/planCardType';
  
export const handleDragEnd = (
  event: DragEndEvent,
  setPlanCards: React.Dispatch<React.SetStateAction<PlanCard[]>>
) => {
    const { over, active } = event; //active: 지금 드래그한 아이쳄(SelectedListCard) over: 아이템이 드롭된 위치(PlanCard);
    if (over && typeof over.id === "string" && over.id.startsWith("PlanCard-")) {//드롭한 영역이 PlanCard일 경우에 실행(PlanCardList에서 Plan-card-로 지정)
      const planId = parseInt(over.id.replace("PlanCard-", "")); //PlanCard1 이렇게 저장한 id에서 숫자만 빼옴
      const placeTitle = active.data.current?.place?.title; //useDraggable에서 저장한 객체에 data에서 place.title꺼내옴

      setPlanCards((prev) =>
        prev.map((card) =>
          card.id === planId //방급 드롭된 카드인 planId랑 같으면
            ? { ...card, places: [...(card.places || []), placeTitle] } //기존 place 목록 뒤에 새 장소 추가
            : card
        )
      );
    }
  };