// Aca se guardan funciones genéricas para construir páginas HTML

export function createPage(title, content) {
  let html = "";
  html += "<!DOCTYPE html><html lang='es'><head><meta charset='UTF-8'>";
  html += `<title>${title}</title>`;
  html += "</head><body>";
  html += `
    <nav>
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

  html += `<h1>${title}</h1>`;
  html += content;

  html += "</body></html>";

  return html;
}

//recibo las varias razas y creo una lista
export function createList(breeds) {
  let html = "<ul>";

  breeds.forEach((breed) => {
    html += `<li> ${breed.nombre} </li>`;
  });

  html += "</ul>";
  return html;
}
