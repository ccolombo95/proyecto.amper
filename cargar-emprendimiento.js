document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Realiza una solicitud para obtener los datos de los emprendimientos
    const response = await fetch('/emprendimientos.json'); // Cambia esta ruta a la correcta
    const data = await response.json(); // Convierte la respuesta en JSON

    // Verifica que los datos contengan la propiedad 'results' y que esta sea un array
    if (Array.isArray(data.results)) {
      cargarEmprendimientos(data.results); // Pasa el array contenido en 'results' a la función
    } else {
      console.error("La propiedad 'results' no es un array:", data.results);
    }
  } catch (error) {
    console.error("Error al cargar los emprendimientos:", error);
  }
});

// Función para cargar los emprendimientos en la tabla
function cargarEmprendimientos(startupsData) {
  const tableBody = document.getElementById('startups-table'); // Referencia al cuerpo de la tabla

  // Itera sobre los datos y crea una fila para cada emprendimiento
  startupsData.forEach(startup => {
    const row = document.createElement('tr'); // Crea una nueva fila de la tabla

    // Crea celdas para cada columna
    row.innerHTML = `
      <td>${startup.id}</td>
      <td><img src="${startup.imagen}" alt="${startup.empresa}" style="width: 100px; height: auto;" /></td>
      <td>${startup.empresa}</td>
      <td>${startup.responsable}</td>
      <td>${startup.descripcion}</td>
      <td>${startup.donaciones}</td>
    `;

    // Agrega la fila a la tabla
    tableBody.appendChild(row);
  });
}
