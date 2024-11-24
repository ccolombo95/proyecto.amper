document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".cards-container");

  try {
    // Hacer el fetch a la URL especificada
    const response = await fetch("./../../startups/startupsdata");

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Parsear la respuesta como JSON
    const startupsData = await response.json();

    // Crear las tarjetas dinámicamente
    startupsData.forEach((startup) => {
      const card = document.createElement("div");
      card.className = "card";

      const image = document.createElement("img");
      image.src = startup.banner || "./imgs/default-startup.png"; // Ruta por defecto si no hay imagen
      image.alt = startup.name;

      const title = document.createElement("h2");
      title.textContent = startup.name;

      const description = document.createElement("p");
      description.textContent = startup.description;

      const link = document.createElement("a");
      link.href = "#verMas";
      link.className = "ver-mas-btn";
      link.textContent = "Ver más";

      // Agregar elementos a la tarjeta
      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(link);

      // Agregar la tarjeta al contenedor
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar las startups:", error);
  }
});
