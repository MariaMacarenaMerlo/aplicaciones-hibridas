import { Router } from "express";
import * as breedsController from "../controllers/breeds.controller.js";

const router = Router();

//la URL habla del recurso, no de la acción.

router.get("/api/breeds", breedsController.getBreeds);

router.get("/api/breeds/:name", breedsController.getBreedByName);

//POST => para crear
router.post("/api/breeds", breedsController.saveBreed);

//DELETE
router.delete("/api/breeds/:id", breedsController.deleteBreed);

//PUT => reemplazar
router.put("/api/breeds/:id", breedsController.replaceBreed);

//PATCH => modificar (editar)
router.patch("/api/breeds/:id", breedsController.editBreed);

export default router;
