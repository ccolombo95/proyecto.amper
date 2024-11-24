document.addEventListener("DOMContentLoaded", () => {
  const fileInputs = document.querySelectorAll(".imagen_url");
  const imageContainers = document.querySelectorAll(".FormImage");

  //! FUNCION PARA MOSTRAR LAS IMÁGENES SELECCIONADAS
  fileInputs.forEach((fileInput, index) => {
    const container = imageContainers[index];

    if (fileInput && container) {
      fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];

        if (file) {
          const reader = new FileReader();

          reader.onload = (e) => {
            container.style.backgroundImage = `url(${e.target.result})`;
          };

          reader.readAsDataURL(file);
        }
      });
    }
  });
});
