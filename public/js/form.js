document.addEventListener("DOMContentLoaded", () => {
  const messages = {
    planificacion:
      "Estoy interesado/a en recibir más información sobre su servicio de planificación empresarial.",
    marketing:
      "Estoy interesado/a en recibir más información sobre su servicio de marketing digital.",
    legal:
      "Estoy interesado/a en recibir más información sobre su servicio de asesoría legal.",
  };

  const form = document.getElementById("contact-form");
  const notesField = document.getElementById("notas");
  const formStatus = document.getElementById("form-status");

  // Asignar eventos de clic a cada flechita
  document.querySelectorAll(".service-box-icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      const serviceId = icon.getAttribute("data-id");
      if (messages[serviceId]) {
        notesField.value = messages[serviceId];
      }
    });
  });

  // Mostrar mensaje de éxito al enviar el formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita el envío real
    formStatus.style.display = "block"; // Muestra el mensaje de éxito
    form.reset(); // Limpia el formulario
    setTimeout(() => {
      formStatus.style.display = "none"; // Oculta el mensaje después de 3 segundos
    }, 3000);
  });
});
