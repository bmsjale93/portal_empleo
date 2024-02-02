/********************************************************************************
* VALIDAD FORMULARIO DE LOGIN
 *******************************************************************************/

document.addEventListener("DOMContentLoaded", function () {
  // Validar formulario de Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      let valid = true;

      if (!email) {
        alert("Por favor, ingrese su correo electrónico.");
        valid = false;
      } else if (!password) {
        alert("Por favor, ingrese su contraseña.");
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
      }
    });
  }
})