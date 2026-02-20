import { Request, Response } from "express";

export const getPlaceDetails = async (req: Request, res: Response) => {
  const { placeId } = req.query;
  console.log("getPlaceDetails API called with placeId:", placeId);
  res.status(200).json({data: "응답완료"
  });
};
