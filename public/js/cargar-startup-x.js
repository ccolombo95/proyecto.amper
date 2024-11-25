document.addEventListener("DOMContentLoaded", async () => {
  // Función para obtener el valor del parámetro `id` de la URL
  function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id"); // Devuelve el valor de 'id'
  }

  // Función para hacer el fetch y cargar los datos en el HTML
  async function fetchStartupData() {
    const id = getIdFromUrl();
    console.log(id);

    if (!id) {
      console.error("ID no encontrado en la URL");
      return;
    }

    try {
      // Realiza la solicitud a la API
      const response = await fetch(`./../../startups/startup/${id}`);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();
      const startup = data[0];

      document.title = `${startup.name}`;

      // Actualiza el contenido del HTML con los datos obtenidos

      // Título
      let titleElement = document.querySelector("#title");
      if (!titleElement) {
        titleElement = document.createElement("h1");
        titleElement.id = "title";
        titleElement.className = "hero__title";
        document.querySelector(".hero__center").prepend(titleElement);
      }
      titleElement.textContent = startup.name;

      // Eslogan
      let sloganElement = document.querySelector("#slogan");
      if (!sloganElement) {
        sloganElement = document.createElement("h2");
        sloganElement.id = "slogan";
        sloganElement.className = "hero__subtitle";
        document.querySelector(".hero__center").appendChild(sloganElement);
      }
      sloganElement.textContent = startup.slogan;

      // Iconos de redes sociales
      const iconsContainer = document.querySelector(".icons");
      if (iconsContainer) {
        iconsContainer.innerHTML = `
          <a href="${startup.website}" class="icon globe" title="Sitio Web">
            <i class="fa-solid fa-globe"></i>
          </a>
          <a href="${startup.facebook}" class="icon facebook" title="Facebook">
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a href="${startup.instagram}" class="icon instagram" title="Instagram">
            <i class="fa-brands fa-square-instagram"></i>
          </a>
        `;
      }

      // Textos y fotos
      const textPhotoMapping = [
        {
          textId: "text1",
          text: startup.text1,
          imgId: "photo1",
          imgSrc: `..${startup.photo1}`,
        },
        {
          textId: "text2",
          text: startup.text2,
          imgId: "photo2",
          imgSrc: `..${startup.photo2}`,
        },
        { textId: "text3", text: startup.text3, imgId: null, imgSrc: null },
      ];

      textPhotoMapping.forEach(({ textId, text, imgId, imgSrc }, index) => {
        // Texto
        let textElement = document.querySelector(`#${textId}`);
        if (!textElement) {
          textElement = document.createElement("p");
          textElement.id = textId;
          textElement.className =
            index < 2 ? "texto-ecovida" : "seccion-final-ecovida";
          document
            .querySelectorAll(".seccion-ecovida, .seccion-final-ecovida")
            [index].appendChild(textElement);
        }
        textElement.textContent = text;

        // Imagen (si aplica)
        if (imgId && imgSrc) {
          let imgElement = document.querySelector(`#${imgId}`);
          if (!imgElement) {
            imgElement = document.createElement("img");
            imgElement.id = imgId;
            imgElement.className = "circulo-ecovida";
            document
              .querySelectorAll(".seccion-ecovida")
              [index].querySelector(".circulo-ecovida")
              .appendChild(imgElement);
          }
          imgElement.src = imgSrc;
        }
      });

      document.querySelector(
        "#portada-principal"
      ).style.backgroundImage = `url("..${startup.banner}")`;
      // Selecciona el contenedor de la información del propietario
      const ownerContainer = document.querySelector("#informacion-propietario");

      // Selecciona los elementos existentes para nombre y email
      const ownerNameElement = ownerContainer.querySelector(".nombre");
      const ownerEmailElement = ownerContainer.querySelector(".email");

      // Actualiza el contenido del nombre
      ownerNameElement.textContent = `${startup.owner}`;

      // Actualiza el contenido del email y agrega el enlace mailto
      ownerEmailElement.textContent = `${startup.mail}`;
      ownerEmailElement.href = `mailto:${startup.mail}`;
    } catch (error) {
      console.error("Error al cargar los datos:", error);
    }
  }

  // Ejecuta la función
  fetchStartupData();
});
