$(document).ready(function () {
$(".delete-application").on("click", function () {
  var aplicacionID = $(this).data("id");
  if (confirm("¿Estás seguro de que quieres borrar esta aplicación?")) {
    $.ajax({
      url: "/portal_empleo/assets/database/borrar_aplicacion.php",
      type: "POST",
      data: { aplicacionID: aplicacionID },
      dataType: "json",
      success: function (response) {
        if (response.success) {
          alert("Aplicación borrada con éxito");
          window.location.reload(); // Recargar la página para actualizar la lista de aplicaciones
        } else {
          alert(response.message);
        }
      },
    });
  }
});
});
