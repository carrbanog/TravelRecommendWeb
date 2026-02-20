import { Router } from "express";
import { getPlaceDetails } from "../controllers/placeDetailController";

const router = Router();

router.get("/", getPlaceDetails);

export default router;
