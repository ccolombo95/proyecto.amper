const startupsTable = document.getElementById("startups-table");
const buscador = document.getElementById("buscador");

const template = (data) => `
  <td>${data.id}</td>
  <td class="table-image"> 
    <img src="./..${data.banner}" alt="${data.name}" style="height:6rem;">
  </td>
  <td class="Name">
    ${data.name}
    <span class="Functions">
      <a href="#" class="delete" data-id="${data.id}">Eliminar</a>
      <span class="FunctionsLine"></span>
      <a href="./edit-startup.html?id=${data.id}" class="edit">Editar</a>
    </span>
  </td>
  <td>${data.owner}</td>
  <td>${data.description}</td>
  <td>${data.donations || 0}</td>`;

// Función para mostrar cada fila de la tabla de emprendimientos con paginación
const showStartups = (startups, page = 1, itemsPerPage = 4) => {
  startupsTable.innerHTML = "";
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const startupsToShow = startups.slice(startIndex, endIndex);

  // Por cada emprendimiento, agrega una fila
  for (let startup of startupsToShow) {
    const tr = document.createElement("tr");
    tr.className = "startup";
    tr.innerHTML = template(startup);
    startupsTable.append(tr);
  }

  updatePaginationControls(page, Math.ceil(startups.length / itemsPerPage));
};

let startupsData;

// Fetch de los emprendimientos
fetch("./../startups")
  .then((res) => res.json())
  .then((res) => {
    startupsData = res;
    showStartups(res);
  })
  .catch((err) => console.log(err));

// Eliminar emprendimiento
startupsTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.preventDefault();
    const startupId = event.target.getAttribute("data-id");

    fetch(`./../startups/${startupId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          event.target.closest("tr").remove();
        } else {
          alert("Error al eliminar el emprendimiento.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al eliminar el emprendimiento.");
      });
  }
});

// Función de búsqueda
buscador.addEventListener("keyup", (event) => {
  const query = event.target.value.toLowerCase();
  const filteredStartups = startupsData.filter((startup) => {
    return (
      startup.name?.toLowerCase().includes(query) ||
      startup.owner?.toLowerCase().includes(query) ||
      startup.description?.toLowerCase().includes(query)
    );
  });
  showStartups(filteredStartups);
});

// Actualización de controles de paginación
const updatePaginationControls = (currentPage, totalPages) => {
  const paginationControls = document.getElementById("pagination-controls");
  paginationControls.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    if (i === currentPage) {
      button.disabled = true;
    }
    button.addEventListener("click", () => showStartups(startupsData, i));
    paginationControls.appendChild(button);
  }
};

// Crear contenedor de controles de paginación al cargar el documento
document.addEventListener("DOMContentLoaded", () => {
  const bodyContainerSection = document.querySelector(".BodyContainerSection");
  const paginationControlsContainer = document.createElement("div");
  paginationControlsContainer.id = "pagination-controls";
  bodyContainerSection.appendChild(paginationControlsContainer);
});
