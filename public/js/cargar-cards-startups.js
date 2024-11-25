document.addEventListener("DOMContentLoaded", async () => {
  const startupsContainer = document.querySelector(".cards-container.startups");

  if (!startupsContainer) {
    console.error("El contenedor de startups no fue encontrado.");
    return; // Detener la ejecución si no se encuentra el contenedor
  }

  try {
    // Hacer el fetch a la URL especificada
    const response = await fetch("./../../startups/startupsdata");

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Parsear la respuesta como JSON
    const startupsData = await response.json();

    // Crear las tarjetas dinámicamente para .cards-container.startups
    startupsData.forEach((startup) => {
      const card = document.createElement("div");
      card.className = "card";

      card.setAttribute("data-aos", "fade-up");

      const image = document.createElement("img");
      image.src = startup.banner || "./imgs/default-startup.png";
      image.alt = startup.name;

      const title = document.createElement("h2");
      title.textContent = startup.name;

      const description = document.createElement("p");
      description.textContent = startup.description;

      const slogan = document.createElement("p");
      slogan.textContent = startup.slogan;

      const link = document.createElement("a");
      link.href = "#verMas";
      link.className = "ver-mas-btn";
      link.textContent = "Ver más";

      // Agregar elementos a la tarjeta
      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(slogan);
      card.appendChild(link);

      // Agregar la tarjeta al contenedor de todas las startups
      startupsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar las startups:", error);
  }
});
