import breedsRoutes from "./routes/breeds.routes.js";
import breedsApiRoute from "./api/routes/breeds.routes.js";

import express from "express";

const app = express();

//tienen que ir antes de las rutas:
app.use(express.urlencoded({ extended: true })); //Middleware que dice: "si me llegan datos enviados por un formulario HTML, procesalos y dejámelos disponibles en req.body"

app.use(express.json()); //para que Express interprete json.

app.use(breedsRoutes);
app.use(breedsApiRoute);

app.use("/", express.static("public")); //para que Express pueda entregar los archivos estáticos de la carpeta public, como HTML, CSS, imágenes y JavaScript del frontend.

app.get("/saludo/:nombre", (req, res) => {
  const { nombre } = req.params;
  res.send(`Hola, ${nombre}, bienvenido a mi servidor Express!`);
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
