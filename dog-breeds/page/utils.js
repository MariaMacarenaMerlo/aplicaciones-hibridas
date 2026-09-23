// Aca se guardan funciones genéricas para construir páginas HTML

export function createPage(title, content) {
  let html = "";
  html += "<!DOCTYPE html><html lang='es'><head><meta charset='UTF-8'>";
  html += `<meta name="viewport" content="width=device-width, initial-scale=1.0">`;
  html += `<title>${title}</title>`;

  html += `  <link rel="preconnect" href="https://fonts.googleapis.com">`;
  html += `  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`;
  html += `  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">`;
  html += `  <link rel="stylesheet" href="/css/styles.css">`;
  html += "</head><body>";
  html += `<header class="header">

    <a href="/" class="brand">

      <div>
        <span class="brand-name">Dog Breeds</span>
        
      </div>
    </a>

    <nav class="nav">
      <a href="/">Inicio</a>
      <a href="/breeds">Ver todas las razas</a>
      <a href="/breeds/new"">Agregar nueva raza</a>
    </nav>

  </header>`;

  html += `
    <nav class="nav detail-nav">
      <a href="/breeds">Todas</a>
      <a href="/breeds?grupo=Deportivo">Deportivo</a>
      <a href="/breeds?grupo=Sabueso">Sabueso</a>
      <a href="/breeds?grupo=Trabajo">Trabajo</a>
      <a href="/breeds?grupo=Terrier">Terrier</a> 
      <a href="/breeds?grupo=Compañía">Compañía</a>
      <a href="/breeds?grupo=Pastoreo">Pastoreo</a>
      <a href="/breeds?grupo=No%20deportivo">No deportivo</a>
    </nav>
  `;

  html += content;

  html += "</body></html>";

  return html;
}

//recibo las varias razas y creo una lista
export function createList(breeds) {
  let html = `<section class="breeds-list">
      <ul>`;

  breeds.forEach((breed) => {
    html += ` <li>
        <a href="/breeds/id/${breed._id}" class="breed-list-item">
          ${breed.nombre}
        </a>
      </li>`;
  });

  html += "</ul></section>";
  return html;
}
