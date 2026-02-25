import { Router } from "express";
import { calculateDistance } from "../controllers/calculateDistanceController";

const router = Router();

router.post("/", calculateDistance);

export default router;
