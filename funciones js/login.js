/********************************************************************************
 * VALIDAR FORMULARIO DE LOGIN
 *******************************************************************************/

document.addEventListener("DOMContentLoaded", function () {
  var loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", function () {
      var email = document.getElementById("emailModal").value;
      var password = document.getElementById("passwordModal").value;

      fetch("login_user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          "email=" +
          encodeURIComponent(email) +
          "&password=" +
          encodeURIComponent(password),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.success) {
            updateUIAfterLogin();
          } else {
            alert("Usuario o contraseña incorrectos");
          }
        })
        .catch(function (error) {
          console.error("Error en la solicitud AJAX:", error);
          alert("Error en la solicitud AJAX.");
        });
    });
  }
});

function updateUIAfterLogin() {
  // Ocultar botones de iniciar sesión y registrarse
  document
    .querySelectorAll(".login-trigger, .register-trigger")
    .forEach(function (element) {
      element.style.display = "none";
    });

  // Añadir mensaje de bienvenida genérico
  var navbar = document.querySelector("#navbar ul");
  if (navbar) {
    var welcomeMessage = document.createElement("li");
    welcomeMessage.innerHTML = '<a href="#">Bienvenido, Usuario</a>';
    navbar.appendChild(welcomeMessage);
  }

  // Cerrar el modal de inicio de sesión de forma segura
  var loginModal = document.getElementById("loginModal");
  if (loginModal) {
    loginModal.style.display = "none";
    document.body.classList.remove("modal-open");
    var modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
  }
}
