import { Request, Response } from "express";
import { fetchNearbyPlaces } from "../api/fetchNearbyPlaces";

const getNearbyPlaces = async (req: Request, res: Response) => {
  const { lat, lng, type } = req.query;

  if (!lat || !lng || !type) {
    return res
      .status(400)
      .json({ message: "Latitude, longitude, and type are required." });
  }

  try {
    const places = await fetchNearbyPlaces(String(lat), String(lng), String(type));

    // ✅ type을 함께 응답에 포함
    res.status(200).json({
      type,
      results: places,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export { getNearbyPlaces };
