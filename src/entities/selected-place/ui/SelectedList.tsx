import React from 'react'
import { useSelectedPlacesStore } from '../model/selectedPlacesStore'

const SelectedList = () => {
  const selectedPlaces = useSelectedPlacesStore((state) => state.selectedPlaces)
  return (
    <ul>
      {selectedPlaces.map((place, idx) => (
        <li key={idx}>{place.title}</li>
      ))}
    </ul>
  )
}

export default SelectedList
