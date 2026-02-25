import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const calculateDistance = async (req: Request, res: Response) => {
  const { locations } = req.body; // 프론트에서 보낸 [{lat, lng}, ...] 배열
  console.log("Received locations for distance calculation:", locations);
};
