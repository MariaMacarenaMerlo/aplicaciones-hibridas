import { createPage, createList } from "../page/utils.js";

export function createBreedsPage(breeds, page, totalPages, filtros) {
  const content =
    createList(breeds) + createPagination(page, totalPages, filtros);

  return createPage("Razas de perros", content);
}

export function createDetailPage(breed) {
  const html = `
    <main class="breed-detail">

      <section class="breed-detail-image">
        <img src="${breed.imagen}" alt="${breed.nombre}">
      </section>

      <section class="breed-detail-content">

        <span class="breed-eyebrow">${breed.grupo}</span>

        <h1>${breed.nombre}</h1>

        <div class="breed-data">
          <div class="breed-data-item">
            <span>Peso</span>
            <strong>${breed.peso_kg} kg</strong>
          </div>

          <div class="breed-data-item">
            <span>Altura</span>
            <strong>${breed.altura_cm} cm</strong>
          </div>

          <div class="breed-data-item">
            <span>Esperanza de vida</span>
            <strong>${breed.esperanza_vida}</strong>
          </div>

          <div class="breed-data-item">
            <span>Origen</span>
            <strong>${breed.origen?.nombre || "No especificado"}</strong>
          </div>
        </div>

        <div class="breed-description">
          <span>Temperamento</span>
          <p>${breed.temperamento}</p>
        </div>

        <div class="breed-description">
          <span>Criado para</span>
          <p>${breed.criado_para}</p>
        </div>

        <div class="breed-actions">
          <a
            href="${breed.enlace}"
            target="_blank"
            class="button"
          >
            Más información 
          </a>

          <a href="/breeds/edit/${breed._id}" class="back-link">
  Editar
</a>

<a href="/breeds/delete/${breed._id}" class="back-link">
  Eliminar
</a>

          <a href="/breeds" class="back-link">
            Volver a razas
          </a>
        </div>

      </section>

    </main>
  `;

  return createPage(breed.nombre, html);
}

export function createPagination(page, totalPages, filtros) {
  console.log(totalPages, page);
  const previousPage = page - 1;
  const nextPage = page + 1;

  const params = new URLSearchParams(filtros); //convierte el objeto en un query string

  let html = `<nav class="pagination">`;

  if (page > 1) {
    params.set("page", previousPage); //actualiza el valor del parametro page en la query string
    html += `<a href="/breeds?${params}" class="pagination-link">Anterior</a>`;
  }

  html += `<span class="pagination-current"> Página ${page} de ${totalPages}</span>`;

  if (page < totalPages) {
    params.set("page", nextPage);

    html += `<a href="/breeds?${params}" class="pagination-link">Siguiente</a>`;
  }

  return html;
}

export function newBreedForm(origins) {
  const originsArray = origins;
  const originOptions = originsArray
    .map((origin) => `<option value="${origin._id}">${origin.nombre}</option>`)
    .join("");
  let html = `
   <section class="form-section">
    <header class="form-header">
        <h1>Agregar una raza</h1>
        <p>Completá la información de la nueva raza.</p>
      </header>

  <form action="/breeds/new" method="POST" class="breed-form">`; //Cuando el usuario toque Crear, agarrá los datos del formulario y mandalos al servidor mediante una petición POST a /breeds/new

  html += `<div class="form-field">
  <label for="nombre">Nombre de la Raza:</label>
  <input type="text" name="nombre" id="nombre" required /> 
  </div>`;

  html += `<div class="form-field">
    <label for="slug">Slug:</label>
    <input type="text" name="slug" id="slug" required/>
  </div>`;

  html += `<div class="form-field">
    <label for="grupo">Grupo:</label>
    <select name="grupo" id="grupo" required>
      <option value="">Seleccionar grupo</option>
      <option value="Deportivo">Deportivo</option>
      <option value="Sabueso">Sabueso</option>
      <option value="Trabajo">Trabajo</option>
      <option value="Terrier">Terrier</option>
      <option value="Compañía">Compañía</option>
      <option value="Pastoreo">Pastoreo</option>
      <option value="No deportivo">No deportivo</option>
    </select>
  </div>`;

  html += `<div class="form-field">
    <label for="peso_kg">Peso (kg):</label>
    <input type="text" name="peso_kg" id="peso_kg" required/>
  </div>`;

  html += `<div class="form-field">
    <label for="altura_cm">Altura (cm):</label>
    <input type="text" name="altura_cm" id="altura_cm" required/>
  </div>`;

  html += `<div class="form-field">
    <label for="esperanza_vida">Esperanza de vida:</label>
    <input type="text" name="esperanza_vida" id="esperanza_vida" required />
  </div>`;

  html += `<div class="form-field">
    <label for="criado_para">Criado para:</label>
    <input type="text" name="criado_para" id="criado_para" required />
  </div>`;

  html += `<div class="form-field">
    <label for="temperamento">Temperamento:</label>
    <input type="text" name="temperamento" id="temperamento" required />
  </div>`;

  html += ` <div class="form-field">
    <label for="origen">Origen:</label>
    <select name="origen" id="origen" required>
    <option value="">Seleccionar origen</option>
    ${originOptions}
    </select>
  </div>`;

  html += `<div class="form-field">
    <label for="imagen">Imagen (URL):</label>
    <input type="text" name="imagen" id="imagen" required />
  </div>`;

  html += `<div class="form-field">
    <label for="enlace">Enlace:</label>
    <input type="text" name="enlace" id="enlace" />
  </div>`;

  html += `<button type="submit" class="button">Crear nueva raza</button>`;
  html += `</form>`;

  return createPage("Nueva Raza", html);
}

export function editBreedForm(breed, origins) {
  const originOptions = origins
    .map(
      (origin) =>
        `<option value="${origin._id}" ${origin.nombre === breed.origen?.nombre ? "selected" : ""}>${origin.nombre}</option>`,
    )
    .join("");

  let html = `
    <section class="form-section">

      <header class="form-header">
        <h1>Editar raza</h1>
        <p>Modificá la información de la raza.</p>
      </header>

      <form action="/breeds/edit/${breed._id}" method="POST" class="breed-form">
  `;

  html += `
    <div class="form-field">
      <label for="nombre">Nombre de la raza:</label>
      <input type="text" name="nombre" id="nombre" value="${breed.nombre}" />
    </div>
  `;

  html += `
    <div class="form-field">
      <label for="slug">Slug:</label>
      <input type="text" name="slug" id="slug" value="${breed.slug}" />
    </div>
  `;

  html += `
  <div class="form-field">
    <label for="grupo">Grupo:</label>

    <select name="grupo" id="grupo">
      <option value="Deportivo" ${breed.grupo === "Deportivo" ? "selected" : ""}>
        Deportivo
      </option>

      <option value="Sabueso" ${breed.grupo === "Sabueso" ? "selected" : ""}>
        Sabueso
      </option>

      <option value="Trabajo" ${breed.grupo === "Trabajo" ? "selected" : ""}>
        Trabajo
      </option>

      <option value="Terrier" ${breed.grupo === "Terrier" ? "selected" : ""}>
        Terrier
      </option>

      <option value="Compañía" ${breed.grupo === "Compañía" ? "selected" : ""}>
        Compañía
      </option>

      <option value="Pastoreo" ${breed.grupo === "Pastoreo" ? "selected" : ""}>
        Pastoreo
      </option>

      <option value="No deportivo" ${breed.grupo === "No deportivo" ? "selected" : ""}>
        No deportivo
      </option>
    </select>
  </div>
`;

  html += `
    <div class="form-field">
      <label for="peso_kg">Peso (kg):</label>
      <input type="text" name="peso_kg" id="peso_kg" value="${breed.peso_kg}" required/>
    </div>
  `;

  html += `
    <div class="form-field">
      <label for="altura_cm">Altura (cm):</label>
      <input type="text" name="altura_cm" id="altura_cm" value="${breed.altura_cm}" required/>
    </div>
  `;

  html += `
    <div class="form-field">
      <label for="esperanza_vida">Esperanza de vida:</label>
      <input
        type="text"
        name="esperanza_vida"
        id="esperanza_vida"
        value="${breed.esperanza_vida}"
        required
      />
    </div>
  `;

  html += `
    <div class="form-field">
      <label for="criado_para">Criado para:</label>
      <input
        type="text"
        name="criado_para"
        id="criado_para"
        value="${breed.criado_para}"
        required
      />
    </div>
  `;

  html += `
    <div class="form-field">
      <label for="temperamento">Temperamento:</label>
      <input
        type="text"
        name="temperamento"
        id="temperamento"
        value="${breed.temperamento}"
        required
      />
    </div>
  `;

  html += `
    <div class="form-field">
      <label for="origen">Origen:</label>

      <select name="origen" id="origen" required>
        ${originOptions}
      </select>
    </div>
  `;

  html += `
    <div class="form-field">
      <label for="imagen">Imagen:</label>
      <input type="text" name="imagen" id="imagen" value="${breed.imagen}" required />
    </div>
  `;

  html += `
    <div class="form-field">
      <label for="enlace">Enlace:</label>
      <input type="text" name="enlace" id="enlace" value="${breed.enlace}" required />
    </div>
  `;

  html += `
        <button type="submit" class="button">
          Editar raza
        </button>

      </form>

   

    </section>
  `;

  return createPage("Editar Raza", html);
}

export function createModalDelete(breed) {
  let html = `
    <section class="delete-section">

      <div class="delete-content">

        <h1>Eliminar raza</h1>

        <p>
          ¿Estás seguro de que deseas eliminar
          <strong>${breed.nombre}</strong>?
        </p>
  `;

  html += `
        <form action="/breeds/delete/${breed._id}" method="POST">
          <button type="submit" class="delete-button">
            Borrar raza
          </button>
        </form>
  `;

  html += `
        <a href="/breeds" class="form-back">
          Volver a razas
        </a>

      </div>

    </section>
  `;

  return createPage("Borrar Raza", html);
}

export function successDeleteBreed(breed) {
  let html = `<section class="success-delete">`;

  html += `<p>La raza ${breed.nombre} fue eliminada correctamente.</p>`;

  html += `<a href="/breeds">Volver a las razas</a>`;

  html += `</section>`;

  return createPage("Raza eliminada", html);
}
