import { createPage, createList } from "../page/utils.js";

export function createBreedsPage(breeds, page, totalPages, filtros) {
  const content =
    createList(breeds) + createPagination(page, totalPages, filtros);

  return createPage("Razas de perros", content);
}

export function createDetailPage(breed) {
  let html = `<img src="${breed.imagen}" alt="${breed.nombre}" width="400">`;

  html += `<p>Grupo: ${breed.grupo}</p>`;
  html += `<p>Peso: ${breed.peso_kg} kg</p>`;
  html += `<p>Altura: ${breed.altura_cm} cm</p>`;
  html += `<p>Esperanza de vida: ${breed.esperanza_vida}</p>`;
  html += `<p>Temperamento: ${breed.temperamento}</p>`;
  html += `<p>Criado para: ${breed.criado_para}</p>`;

  html += `<p>
    <a href="${breed.enlace}" target="_blank">
      Más información
    </a>
  </p>`;

  html += `<a href="/breeds">Volver</a>`;

  return createPage(breed.nombre, html);
}

export function createPagination(page, totalPages, filtros) {
  console.log(totalPages, page);
  const previousPage = page - 1;
  const nextPage = page + 1;

  const params = new URLSearchParams(filtros); //convierte el objeto en un query string

  let html = "";

  if (page > 1) {
    params.set("page", previousPage); //actualiza el valor del parametro page en la query string
    html += `<a href="/breeds?${params}">Anterior</a>`;
  }

  html += `<span>Página ${page} de ${totalPages}</span>`;

  if (page < totalPages) {
    params.set("page", nextPage);

    html += `<a href="/breeds?${params}">Siguiente</a>`;
  }

  return html;
}

export function newBreedForm() {
  let html = `<form action="/breeds/new" method="POST">`; //Cuando el usuario toque Crear, agarrá los datos del formulario y mandalos al servidor mediante una petición POST a /breeds/new

  html += `<div>
  <label for="nombre">Nombre de la Raza:</label>
  <input type="text" name="nombre" id="nombre" /> 
  </div>`;

  html += `<div>
    <label for="slug">Slug:</label>
    <input type="text" name="slug" id="slug" />
  </div>`;

  html += `<div>
    <label for="grupo">Grupo:</label>
    <input type="text" name="grupo" id="grupo" />
  </div>`;

  html += `<div>
    <label for="peso_kg">Peso (kg):</label>
    <input type="text" name="peso_kg" id="peso_kg" />
  </div>`;

  html += `<div>
    <label for="altura_cm">Altura (cm):</label>
    <input type="text" name="altura_cm" id="altura_cm" />
  </div>`;

  html += `<div>
    <label for="esperanza_vida">Esperanza de vida:</label>
    <input type="text" name="esperanza_vida" id="esperanza_vida" />
  </div>`;

  html += `<div>
    <label for="criado_para">Criado para:</label>
    <input type="text" name="criado_para" id="criado_para" />
  </div>`;

  html += `<div>
    <label for="temperamento">Temperamento:</label>
    <input type="text" name="temperamento" id="temperamento" />
  </div>`;

  html += `<div>
    <label for="imagen">Imagen (URL):</label>
    <input type="text" name="imagen" id="imagen" />
  </div>`;

  html += `<div>
    <label for="enlace">Enlace:</label>
    <input type="text" name="enlace" id="enlace" />
  </div>`;

  html += `<button type="submit">Crear nueva raza</button>`;
  html += `</form>`;
  html += `<a href="/breeds">Volver</a>`;

  return createPage("Nueva Raza", html);
}

export function editBreedForm(breed) {
  let html = `<form action="/breeds/edit/${breed._id}" method="POST">`;
  html += `<div>
    <label for="nombre">Nombre de la raza:</label>
    <input type="text" name="nombre" id="nombre" value="${breed.nombre}" />
  </div>`;

  html += `<div>
    <label for="slug">Slug:</label>
    <input type="text" name="slug" id="slug" value="${breed.slug}" />
  </div>`;

  html += `<div>
    <label for="grupo">Grupo:</label>
    <input type="text" name="grupo" id="grupo" value="${breed.grupo}" />
  </div>`;

  html += `<div>
    <label for="peso_kg">Peso (kg):</label>
    <input type="text" name="peso_kg" id="peso_kg" value="${breed.peso_kg}" />
  </div>`;

  html += `<div>
    <label for="altura_cm">Altura (cm):</label>
    <input type="text" name="altura_cm" id="altura_cm" value="${breed.altura_cm}" />
  </div>`;

  html += `<div>
    <label for="esperanza_vida">Esperanza de vida:</label>
    <input type="text" name="esperanza_vida" id="esperanza_vida" value="${breed.esperanza_vida}" />
  </div>`;

  html += `<div>
    <label for="criado_para">Criado para:</label>
    <input type="text" name="criado_para" id="criado_para" value="${breed.criado_para}" />
  </div>`;

  html += `<div>
    <label for="temperamento">Temperamento:</label>
    <input type="text" name="temperamento" id="temperamento" value="${breed.temperamento}" />
  </div>`;

  html += `<div>
    <label for="imagen">Imagen:</label>
    <input type="text" name="imagen" id="imagen" value="${breed.imagen}" />
  </div>`;

  html += `<div>
    <label for="enlace">Enlace:</label>
    <input type="text" name="enlace" id="enlace" value="${breed.enlace}" />
  </div>`;

  html += `<button type="submit">Editar raza</button>`;
  html += `</form>`;
  html += `<a href="/breeds">Volver</a>`;

  return createPage("Editar Raza", html);
}

export function createModalDelete(breed) {
  let html = `<p>¿Estás seguro que deseas borrar la raza ${breed.nombre}?</p>`;
  html += `<form action = "/breeds/delete/${breed._id}" method="POST">`;
  html += `<button type="submit">Borrar raza</button>`;
  html += `</form>`;
  html += `<a href="/breeds">Volver</a>`;
  return createPage("Borrar Raza", html);
}

export function successDeleteBreed(breed) {
  let html = `<p>La raza ${breed.nombre} fue eliminada correctamente.</p>`;

  html += `<a href="/breeds">Volver a las razas</a>`;

  return createPage("Raza eliminada", html);
}
