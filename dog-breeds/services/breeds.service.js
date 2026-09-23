//import { readFile, writeFile } from "fs/promises";

import { ObjectId } from "mongodb";
import { db as conexion } from "../config/db.js";

//traigo todas las razas:
export async function getBreeds(filtros = {}) {
  const db = conexion();
  //Paginado
  const page = parseInt(filtros?.page ?? 1); // ?. => optional chaning: pregunta si filtros existe, y si es así que me de la propiedad page/
  const limit = parseInt(filtros?.limit ?? 10);
  const skip = (page - 1) * limit;

  //Filtros:
  const filter = {};
  //por grupo:
  if (filtros?.grupo) {
    filter.grupo = filtros.grupo;
  }
  //por nombre
  if (filtros?.nombre) {
    filter.nombre = { $regex: filtros.nombre, $options: "i" };
  }

  //cantidad de resultados filtrados.
  const total = await db.collection("Breeds").countDocuments(filter);

  const totalPages = Math.ceil(total / limit);

  //consulta a la base de MongoDB
  const breeds = await db
    .collection("Breeds")
    .find(filter)
    .skip(skip)
    .limit(limit)
    .toArray();

  return {
    breeds,
    page,
    totalPages,
    total,
  };
}

export async function getBreedByName(name) {
  const db = conexion();
  const breed = await db.collection("Breeds").findOne({
    nombre: name,
  });
  return breed;
}

export async function getBreedById(id) {
  const db = conexion();
  const breed = await db.collection("Breeds").findOne({
    _id: new ObjectId(id),
  });
  return breed;
}

export async function saveBreed(breed) {
  const db = conexion();
  await db.collection("Breeds").insertOne(breed);

  return breed;
}

export async function editBreed(id, breed) {
  const db = conexion();
  await db
    .collection("Breeds")
    .updateOne({ _id: new ObjectId(id) }, { $set: breed });

  return getBreedById(id);
}

export async function deleteBreed(id) {
  const db = conexion();
  const breed = await db.collection("Breeds").findOne({
    _id: new ObjectId(id),
  });
  await db.collection("Breeds").deleteOne({
    _id: new ObjectId(id),
  });

  return breed;
}

export async function replaceBreed(id, breed) {
  const db = conexion();
  await db.collection("Breeds").replaceOne({ _id: new ObjectId(id) }, breed);

  return getBreedById(id);
}

export async function getBreedByGroup(group) {
  const db = conexion();
  const breeds = await db.collection("Breeds").find({ grupo: group }).toArray();

  return breeds;
}

export async function getBreedsByOrigin(originId) {
  const db = conexion();

  const breeds = await db
    .collection("Breeds")
    .find({
      "origen._id": new ObjectId(originId),
    })
    .toArray();
  return breeds;
}
