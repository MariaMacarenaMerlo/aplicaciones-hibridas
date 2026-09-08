// Aca se guardan funciones genéricas para construir páginas HTML

export function createPage(title, content) {
  let html = "";
  html += "<!DOCTYPE html><html lang='es'><head><meta charset='UTF-8'>";
  html += `<title>${title}</title>`;
  html += "</head><body>";
  html += `<h1>${title}</h1>`;
  html += content;

  html += "</body></html>";

  return html;
}

export function createList(breeds) {
  let html = "<ul>";

  breeds.forEach((breed) => {
    html += `<li> ${breed.name} </li>`;
  });

  html += "</ul>";
  return html;
}
