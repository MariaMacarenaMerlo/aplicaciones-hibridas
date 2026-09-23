import * as breedsService from "../../services/breeds.service.js";
import * as originsService from "../../services/origins.service.js";

export async function getBreeds(req, res) {
  try {
    const filtros = req.query;

    const breeds = await breedsService.getBreeds(filtros);
    res.status(200).json(breeds); //JSON te dice QUÉ respondió el servidor. Status Code te dice CÓMO salió la petición.
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function getBreedByName(req, res) {
  try {
    const name = req.params.name;

    const breed = await breedsService.getBreedByName(name);

    if (!breed) {
      return res.status(404).json({ meesage: "Raza no encontrada" });
    }

    res.status(200).json(breed);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function saveBreed(req, res) {
  try {
    console.log("BODY RECIBIDO:", req.body);

    const origin = await originsService.getOriginById(req.body.originId);

    //validacion:
    if (!origin) {
      return res.status(404).json({
        message: "Origen no encontrado",
      });
    }

    const breed = {
      ...req.body,
      origen: {
        _id: origin._id,
        nombre: origin.nombre,
      },
    };

    delete breed.originId;

    const savedBreed = await breedsService.saveBreed(breed);

    res.status(201).json(savedBreed);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function deleteBreed(req, res) {
  try {
    const id = req.params.id;

    const deletedBreed = await breedsService.deleteBreed(id);

    if (!deletedBreed) {
      return res.status(404).json({
        message: "Raza no encontrada",
      });
    }

    res.status(200).json(deletedBreed);
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
    });
  }
}

export async function replaceBreed(req, res) {
  try {
    const id = req.params.id;
    const breed = req.body;

    const replaceBreed = await breedsService.replaceBreed(id, breed);

    if (!replaceBreed) {
      return res.status(404).json({ message: "Raza no encontrada" });
    }

    res.status(200).json(replaceBreed);
  } catch (error) {
    res.status(500).json({ message: "No se pudo reemplazar la raza" });
  }
}

export async function editBreed(req, res) {
  try {
    const id = req.params.id;
    const breed = req.body;

    const editBreed = await breedsService.editBreed(id, breed);
    if (!editBreed) {
      return res.status(404).json({ message: "Raza no encontrada" });
    }
    res.status(200).json(editBreed);
  } catch (error) {
    res.status(500).json({ message: "No se pudo editar la raza" });
  }
}
