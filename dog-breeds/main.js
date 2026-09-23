import express from "express";

import breedsRoutes from "./routes/breeds.routes.js";
import breedsApiRoute from "./api/routes/breeds.routes.js";
import originsApiRoute from "./api/routes/origins.routes.js";

const app = express();

//Middlewares tienen que ir antes de las rutas
app.use("/", express.static("public")); //para que Express pueda entregar los archivos estáticos de la carpeta public, como HTML, CSS, imágenes y JavaScript del frontend.

app.use(express.urlencoded({ extended: true })); //Middleware que dice: "si me llegan datos enviados por un formulario HTML, procesalos y dejámelos disponibles en req.body"

app.use(express.json()); //para que Express interprete json.

//rutas
app.use(breedsRoutes);
app.use(breedsApiRoute);
app.use(originsApiRoute);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
