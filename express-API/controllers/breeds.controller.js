import * as breedService from "../services/breeds.service.js"; //Importá todo lo que exporta breeds.service.js y agrupalo bajo el nombre breedService
import * as breedView from "../views/breeds.view.js";

export async function getBreeds(req, res) {
  try {
    const filtros = req.query;
    const { breeds, page, totalPages, total } =
      await breedService.getBreeds(filtros);

    res.send(breedView.createBreedsPage(breeds, page, totalPages, filtros));
  } catch (error) {}
}

export async function getBreedbyName(req, res) {
  try {
    const name = req.params.name; //le digo a Express que el parametro name me lo guarde en la constante name
    const breedByName = await breedService.getBreedByName(name);
    res.send(breedView.createDetailPage(breedByName));
  } catch (error) {}
}

export async function getBreedbyId(req, res) {
  try {
    const id = req.params.id;
    const breedById = await breedService.getBreedById(id);
    const html = breedView.createDetailPage(breedById);
    res.send(html);
  } catch (error) {}
}

export async function newBreedForm(req, res) {
  try {
    const html = breedView.newBreedForm();
    res.send(html); //llamo a la funcion newBreedForm de breeds.view.js y luego res.send() para enviar la respuesta al cliente.
  } catch (error) {
    console.log(error);
    res.send("Error al crear el formulario");
  }
}

export async function saveBreed(req, res) {
  try {
    const breed = req.body;
    const saveBreed = await breedService.saveBreed(breed);
    const html = breedView.createDetailPage(saveBreed);
    res.send(html);
  } catch (error) {}
}

export async function editBreedForm(req, res) {
  try {
    const id = req.params.id;
    const breed = await breedService.getBreedById(id);
    const html = breedView.editBreedForm(breed);
    res.send(html);
  } catch (error) {}
}

export async function editBreed(req, res) {
  try {
    const id = req.params.id;
    const breed = req.body;
    const editedBreed = await breedService.editBreed(id, req.body);

    const html = breedView.createDetailPage(editedBreed);
    res.send(html);
  } catch (error) {}
}

//Por GET:
export async function deleteBreedForm(req, res) {
  try {
    const id = req.params.id;
    const breed = await breedService.getBreedById(id);

    const html = breedView.createModalDelete(breed);
    res.send(html);
  } catch (error) {}
}

// Delete por POST:
export async function deleteBreed(req, res) {
  console.log("entre al delete");
  try {
    const id = req.params.id;
    const deletedBreed = await breedService.deleteBreed(id);

    const html = breedView.successDeleteBreed(deletedBreed);
    res.send(html);
  } catch (error) {
    console.log(error);
  }
}

export async function getBreedByGroup(req, res) {
  try {
    const group = req.params.group;
    const breeds = await breedService.getBreedByGroup(group);
    const html = breedView.createBreedsPage(breeds);
    res.send(html);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener las razas");
  }
}
