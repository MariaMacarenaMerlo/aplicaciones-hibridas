import { Router } from "express";
import * as originsController from "../controllers/origins.controller.js";

const router = Router();

router.get("/api/origins", originsController.getOrigins);
router.post("/api/origins", originsController.saveOrigin);
router.get("/api/origins/:id/breeds", originsController.getBreedsByOrigin);

export default router;
