import { ObjectId } from "mongodb";
import { db as conexion } from "../config/db.js";

export async function getOrigins() {
  const db = conexion();
  const origins = await db.collection("Origins").find().toArray();
  return origins;
}

export async function getOriginById(id) {
  const db = conexion();

  const origin = await db.collection("Origins").findOne({
    _id: new ObjectId(id), //findOne -> filtro
  });

  return origin;
}

export async function saveOrigin(origin) {
  const db = conexion();
  await db.collection("Origins").insertOne(origin);

  return origin;
}
