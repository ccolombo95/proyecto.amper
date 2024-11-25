document.addEventListener("DOMContentLoaded", async () => {
  const sliderContainer = document.querySelector(".cards-container.slider");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  if (!sliderContainer || !prevButton || !nextButton) {
    console.error("No se encontraron los contenedores o botones.");
    return; // Detener la ejecución si los contenedores o botones no están presentes
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

    // Obtener las últimas 3 startups
    const lastThreeStartups = startupsData.slice(-3); // Seleccionar los últimos 3

    // Crear las tarjetas dinámicamente para el slider
    lastThreeStartups.forEach((startup) => {
      const card = document.createElement("div");
      card.className = "card";

      card.setAttribute("data-aos", "zoom-in");

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

      link.href = `./pages/startup-x.html?id=${startup.id}`;
      link.className = "ver-mas-btn";
      link.textContent = "Ver más";

      // Agregar elementos a la tarjeta
      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(link);

      // Agregar la tarjeta al contenedor del slider
      sliderContainer.appendChild(card);
    });

    // Inicializar las variables para el slider
    const cardWidth = document.querySelector(".card").offsetWidth + 30; // El ancho de la tarjeta más el margen
    let currentPosition = 0;

    // Función para mover el slider
    const moveSlider = () => {
      sliderContainer.style.transform = `translateX(-${
        cardWidth * currentPosition
      }px)`;
    };

    // Evento para el botón "prev"
    prevButton.addEventListener("click", () => {
      if (currentPosition > 0) {
        currentPosition -= 1;
        moveSlider();
      }
    });

    // Evento para el botón "next"
    nextButton.addEventListener("click", () => {
      if (currentPosition < lastThreeStartups.length - 1) {
        currentPosition += 1;
        moveSlider();
      }
    });
  } catch (error) {
    console.error("Error al cargar las startups para el slider:", error);
  }
});
