//import { readFile, writeFile } from "fs/promises";

import { MongoClient, ObjectId } from "mongodb";
//CONEXION:
const MONGO_URI =
  "mongodb+srv://mariamerlo_db_user:UMybw0NekLpDedqX@appshibridas.72pr6lw.mongodb.net/?appName=AppsHibridas";

const client = new MongoClient(MONGO_URI);
const db = client.db("AH20232CP1");

//traigo todas las razas:
export async function getBreeds(filtros = {}) {
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
  const breed = await db.collection("Breeds").findOne({
    nombre: name,
  });
  return breed;
}

export async function getBreedById(id) {
  const breed = await db.collection("Breeds").findOne({
    _id: new ObjectId(id),
  });
  return breed;
}

export async function saveBreed(breed) {
  await db.collection("Breeds").insertOne(breed);

  return breed;
}

export async function editBreed(id, breed) {
  await db
    .collection("Breeds")
    .updateOne({ _id: new ObjectId(id) }, { $set: breed });

  return getBreedById(id);
}

export async function deleteBreed(id) {
  const breed = await db.collection("Breeds").deleteOne({
    _id: new ObjectId(id),
  });

  return breed;
}

export async function replaceBreed(id, breed) {
  await db.collection("Breeds").replaceOne({ _id: new ObjectId(id) }, breed);

  return getBreedById(id);
}

export async function getBreedByGroup(group) {
  const breeds = await db.collection("Breeds").find({ grupo: group }).toArray();

  return breeds;
}
