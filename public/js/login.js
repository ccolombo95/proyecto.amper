document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`./../../auth/checkCookie`);
    const data = await response.json();

    if (data.tokenValid === true) {
      document.getElementById("iniciarSesion").style.display = "none";
      document.getElementById("cerrarSesion").style.display = "block";
      document.getElementById("administrador").style.display = "block";
    } else if (data.tokenValid === false) {
      document.getElementById("iniciarSesion").style.display = "block";
      document.getElementById("cerrarSesion").style.display = "none";
      document.getElementById("administrador").style.display = "none";
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al verificar el token.");
  }
});
