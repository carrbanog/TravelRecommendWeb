import { Router } from "express";
import { getNearbyPlaces } from "../controllers/nearbyPlaces";

const router = Router();

router.get("/", getNearbyPlaces);

export default router;
