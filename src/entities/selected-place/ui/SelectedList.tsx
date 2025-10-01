import React from 'react'
import { useSelectedPlacesStore } from '../model/selectedPlacesStore'
import type { NearPlace } from '../../../shared/types/nearPlaceType'

type SelectedListProps = {
  place?: NearPlace[]
}

const SelectedList = ({place}: SelectedListProps) => {
  const selectedPlaces = useSelectedPlacesStore((state) => state.selectedPlaces)
  return (
    <ul>
      {place?.map((place, idx) => (
        <li key={idx}>{place.title}</li>
      ))}
    </ul>
  )
}

export default SelectedList
