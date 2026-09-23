import express from "express";
import * as breedsController from "../controllers/breeds.controller.js";

const route = express.Router();

//Orden de las rutas: Rutas estáticas/específicas primero → rutas con params más generales después.

route.get("/breeds", breedsController.getBreeds);

route.get("/breeds/new", breedsController.newBreedForm); //"Formulario"
route.post("/breeds/new", breedsController.saveBreed); //

route.get("/breeds/edit/:id", breedsController.editBreedForm);
route.post("/breeds/edit/:id", breedsController.editBreed);

route.get("/breeds/delete/:id", breedsController.deleteBreedForm);
route.post("/breeds/delete/:id", breedsController.deleteBreed);

route.get("/breeds/id/:id", breedsController.getBreedbyId);
route.get("/breeds/grupo/:group", breedsController.getBreedByGroup);
route.get("/breeds/:name", breedsController.getBreedbyName);

export default route;
