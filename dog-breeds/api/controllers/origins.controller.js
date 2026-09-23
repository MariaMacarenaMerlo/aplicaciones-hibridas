import * as originsService from "../../services/origins.service.js";
import * as breedsService from "../../services/breeds.service.js";

export async function getOrigins(req, res) {
  try {
    const origin = await originsService.getOrigins();
    res.status(200).json(origin);
  } catch (error) {
    res.status(500).json({
      message: "No se pudieron obtener los orígenes",
    });
  }
}

export async function saveOrigin(req, res) {
  try {
    //validacion:
    if (
      !req.body.nombre ||
      !req.body.codigo ||
      !req.body.imagen ||
      !req.body.descripcion
    ) {
      return res.status(400).json({
        message: "Faltan campos obligatorios",
      });
    }
    const origin = {
      nombre: req.body.nombre,
      codigo: req.body.codigo,
      imagen: req.body.imagen,
      descripcion: req.body.descripcion,
    };

    const newOrigin = await originsService.saveOrigin(origin);

    res.status(201).json(newOrigin);
  } catch (error) {
    res.status(500).json({
      message: "No se pudo crear el origen",
    });
  }
}

export async function getBreedsByOrigin(req, res) {
  try {
    const originId = req.params.id; //es params y no body porque viene por URL

    const breeds = await breedsService.getBreedsByOrigin(originId);

    res.status(200).json(breeds);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "No se pudieron obtener las razas del origen",
    });
  }
}
