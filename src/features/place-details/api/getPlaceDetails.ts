import axios from 'axios';

// 마우스를 올리면 세부 정보를 보여주는 API
export const getPlaceDetails = async (placeId: string) => {
  console.log("getPlaceDetails called with placeId:", placeId);
  try{
    const res = await axios.get(`http://localhost:5000/placeDetails`, {
      params: {
        placeId,
      }
    });
    console.log("Response from getPlaceDetails API:", res);
    return res.data;
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
};
