/********************************************************************************
 * VALIDAR FORMULARIO DE LOGIN
 *******************************************************************************/

function updateUIAfterLogin(userName) {
  // Ocultar botones de iniciar sesión y registrarse
  $(".login-trigger").parent().hide();
  $(".register-trigger").parent().hide();

  // Añadir mensaje de bienvenida
  var welcomeMessage = `<li><a href="#">Bienvenido, ${userName}</a></li>`;
  $("#navbar ul").append(welcomeMessage);

  // Opción adicional: cerrar modal con JavaScript nativo si jQuery no funciona
  var loginModal = document.getElementById("loginModal");
  $(loginModal).modal("hide"); // Intenta cerrar el modal con jQuery
  if (loginModal) loginModal.style.display = "none"; // Fallback con JavaScript puro

  // Asegúrate de que el modal se cierra correctamente
  $("body").removeClass("modal-open");
  $(".modal-backdrop").remove();
}

$(document).ready(function () {
  $("#loginButton").submit(function (e) {
    var email = $("#emailModal").val();
    var password = $("#passwordModal").val();

    $.ajax({
      type: "POST",
      url: "database/login_user.php",
      data: {
        email: email,
        password: password,
      },
      success: function (response) {
        var data = JSON.parse(response);
        if (data.success) {
          updateUIAfterLogin(data.userName);
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      },
      error: function () {
        alert("Error en la solicitud AJAX.");
      },
    });
  });
});
