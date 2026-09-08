import { createPage, createList } from "../page/utils.js";

export function createBreedsPage(breeds) {
  return createPage("Razas de perros", createList(breeds));
}

export function createDetailPage(breed) {
  let html = `<p>Grupo: ${breed.breed_group} </p> `;
  html += `<p>Esperanza de vida: ${breed.life_span}</p>`;
  html += `<p>Temperamento: ${breed.temperament}</p>`;
  html += `<p>Origen: ${breed.origin}</p>`;
  html += "<a href='/breeds'>Volver</a>";

  return createPage(breed.name, html);
}

export function newBreedForm() {
  let html = `<form action="/breeds/new" method="POST">`; //Cuando el usuario toque Crear, agarrá los datos del formulario y mandalos al servidor mediante una petición POST a /breeds/new
  html += `<div>
  <label for="name">Nombre de la Raza:</label>
  <input type="text" name="name" id="name" /> 
  </div>`;

  html += `<div>
  <label for="breed_group">Grupo de la Raza:</label>
  <input type="text" name="breed_group" id="breed_group" /> 
  </div>`;

  html += `<div>
  <label for="life_span">Esperanza de vida:</label>
  <input type="text" name="life_span" id="life_span" /> 
  </div>`;

  html += `<div>
  <label for="temperament">Temperamento:</label>
  <input type="text" name="temperament" id="temperament" /> 
  </div>`;

  html += `<div>
  <label for="origin">Origen:</label>
  <input type="text" name="origin" id="origin" /> 
  </div>`;

  html += `<button type="submit">Crear nueva raza</button>`;
  html += `</form>`;
  html += `<a href="/breeds">Volver</a>`;

  return createPage("Nueva Raza", html);
}

export function editBreedForm(breed) {
  let html = `<form action="/breeds/edit/${breed.id}" method="POST">`;
  html += `<div>
  <label for="name">Nombre de la Raza:</label>
  <input type="text" name="name" id="name" value="${breed.name}" /> 
  </div>`;

  html += `<div>
  <label for="breed_group">Grupo de la Raza:</label>
  <input type="text" name="breed_group" id="breed_group" value="${breed.breed_group}" /> 
  </div>`;

  html += `<div>
  <label for="life_span">Esperanza de vida:</label>
  <input type="text" name="life_span" id="life_span" value="${breed.life_span}" /> 
  </div>`;

  html += `<div>
  <label for="temperament">Temperamento:</label>
  <input type="text" name="temperament" id="temperament" value="${breed.temperament}" /> 
  </div>`;

  html += `<div>
  <label for="origin">Origen:</label>
  <input type="text" name="origin" id="origin" value="${breed.origin}" /> 
  </div>`;

  html += `<button type="submit">Editar raza</button>`;
  html += `</form>`;
  html += `<a href="/breeds">Volver</a>`;
  return createPage("Editar Raza", html);
}

export function createModalDelete(breed) {
  let html = `<p>¿Estás seguro que deseas borrar la raza ${breed.name}?</p>`;
  html += `<form action = "/breeds/delete/${breed.id}" method="POST">`;
  html += `<button type="submit">Borrar raza</button>`;
  html += `</form>`;
  html += `<a href="/breeds">Volver</a>`;
  return createPage("Borrar Raza", html);
}

export function successDeleteBreed(breed) {
  let html = `<p>La raza ${breed.name} fue eliminada correctamente.</p>`;

  html += `<a href="/breeds">Volver a las razas</a>`;

  return createPage("Raza eliminada", html);
}
