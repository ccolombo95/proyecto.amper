let startup;

//! Función para mostrar los datos en el formulario
const mostrarDatos = () => {
  const formImage = document.querySelectorAll(".FormImage");
  const fileInputs = document.querySelectorAll(".imagen_url");

  // Función para actualizar la imagen en el fondo de un contenedor
  function updateImage(container, url) {
    container.style.backgroundImage = `url('${url}')`;
  }

  if (startup) {
    // Imagen principal (banner)
    if (startup.banner) {
      const bannerContainer = formImage[0];
      updateImage(bannerContainer, `./..${startup.banner}`);
      localStorage.setItem("bannerAnterior", startup.banner);
    }

    // Otras imágenes
    if (startup.photo1) {
      const photo1Container = formImage[1];
      updateImage(photo1Container, `./..${startup.photo1}`);
      localStorage.setItem("photo1Anterior", startup.photo1);
    }
    if (startup.photo2) {
      const photo2Container = formImage[2];
      updateImage(photo2Container, `./..${startup.photo2}`);
      localStorage.setItem("photo2Anterior", startup.photo2);
    }

    // Mostrar datos en los inputs
    document.getElementById("name").value = startup.name || "";
    document.getElementById("slogan").value = startup.slogan || "";
    document.getElementById("description").value = startup.description || "";
    document.getElementById("facebook").value = startup.facebook || "";
    document.getElementById("instagram").value = startup.instagram || "";
    document.getElementById("website").value = startup.website || "";
    document.getElementById("owner").value = startup.owner || "";
    document.getElementById("phone").value = startup.phone || "";
    document.getElementById("mail").value = startup.mail || "";
    document.getElementById("text1").value = startup.text1 || "";
    document.getElementById("text2").value = startup.text2 || "";
    document.getElementById("text3").value = startup.text3 || "";
  } else {
    console.error("No se encontraron datos del emprendimiento.");
  }

  // Manejo de vista previa para imágenes
  fileInputs.forEach((fileInput, index) => {
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          updateImage(formImage[index], e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const startupId = urlParams.get("id");

  //! Obtener los datos del emprendimiento por ID
  fetch(`./../startups/startup/${startupId}`)
    .then((res) => res.json())
    .then((data) => {
      startup = data[0];
      mostrarDatos();
    })
    .catch((error) => {
      console.error("Error al obtener los datos del emprendimiento:", error);
    });
});

const updateButton = document.getElementById("ButtonAdmin");

// Función para manejar la actualización
const modifyButtonHandleClick = (e) => {
  e.preventDefault();

  const bannerInput = document.querySelector(".imagen_url[name='banner']");
  const photo1Input = document.querySelector(".imagen_url[name='photo1']");
  const photo2Input = document.querySelector(".imagen_url[name='photo2']");

  const bannerAnterior = localStorage.getItem("bannerAnterior") || "";
  const photo1Anterior = localStorage.getItem("photo1Anterior") || "";
  const photo2Anterior = localStorage.getItem("photo2Anterior") || "";

  const body = {
    name: document.getElementById("name").value,
    slogan: document.getElementById("slogan").value,
    description: document.getElementById("description").value,
    facebook: document.getElementById("facebook").value,
    instagram: document.getElementById("instagram").value,
    website: document.getElementById("website").value,
    owner: document.getElementById("owner").value,
    phone: document.getElementById("phone").value,
    mail: document.getElementById("mail").value,
    text1: document.getElementById("text1").value,
    text2: document.getElementById("text2").value,
    text3: document.getElementById("text3").value,
    banner: bannerInput.files.length === 0 ? bannerAnterior : "",
    photo1: photo1Input.files.length === 0 ? photo1Anterior : "",
    photo2: photo2Input.files.length === 0 ? photo2Anterior : "",
  };

  const formData = new FormData();
  for (const key in body) {
    formData.append(key, body[key]);
  }

  if (bannerInput.files.length > 0) {
    formData.append("banner", bannerInput.files[0]);
  }
  if (photo1Input.files.length > 0) {
    formData.append("photo1", photo1Input.files[0]);
  }
  if (photo2Input.files.length > 0) {
    formData.append("photo2", photo2Input.files[0]);
  }

  fetch(`./../startups/${startup.id}`, {
    method: "PUT",
    body: formData,
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = `./startups.html`;
      }
    })
    .catch((err) => alert(err));
};

updateButton.addEventListener("click", modifyButtonHandleClick);
