$(document).ready(function () {
  $("#uploadCvForm").on("submit", function (e) {
    e.preventDefault(); // Detiene el envío normal del formulario

    var formData = new FormData(this);

    $.ajax({
      url: "/portal_empleo/assets/database/upload_cv.php",
      type: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (data) {
        alert(data);
        // Recarga solo la sección de currículums
        $("#userCurriculumsCard").load(location.href + " #userCurriculumsCard");
      },
      error: function () {
        alert("Error al subir el archivo.");
      },
    });
  });
});
