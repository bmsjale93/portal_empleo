/********************************************************************************
 * VALIDAR FORMULARIO DE LOGIN
 *******************************************************************************/

function updateUIAfterLogin(userName) {
  $(".login-trigger, .register-trigger").closest("li").hide(); // Oculta los botones de inicio de sesión y registro
  $("#navbar ul").append(`<li><a href="#">Bienvenido, ${userName}</a></li>`); // Agrega el mensaje de bienvenida
  $("#loginModal").modal("hide"); // Oculta el modal de inicio de sesión
  // Opcional: puedes recargar la página para reflejar los cambios de estado de sesión más claramente
  // window.location.reload();
}

    
$(document).ready(function () {
  $("#loginFormModal").submit(function (e) {
    e.preventDefault(); // Prevenir el envío normal del formulario

    const email = $("#emailModal").val();
    const password = $("#passwordModal").val();

    $.ajax({
      type: "POST", // Asegurarse de que estamos haciendo una solicitud POST
      url: "database/login_user.php", // Asegúrate de que la ruta al script PHP es correcta.
      data: {
        email: email,
        password: password,
      },
      success: function (response) {
        var data = JSON.parse(response); // Parsea la respuesta JSON
        if (data.success) {
          updateUIAfterLogin(data.userName); // Actualiza la interfaz de usuario según sea necesario
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