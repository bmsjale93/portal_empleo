$(document).ready(function () {
  loadOffers();
});

// Función para cargar las ofertas de trabajo desde la base de datos
function loadOffers() {
  $.ajax({
    url: "/portal_empleo/assets/database/get_ofertas.php", // Ajusta esta ruta según sea necesario.
    type: "GET",
    dataType: "json",
    success: function (data) {
      if (!data.error) {
        displayOffers(data);
      } else {
        $("#offersContainer").html("<p>" + data.error + "</p>");
      }
    },
    error: function () {
      $("#offersContainer").html(
        "<p>Hubo un error al cargar las ofertas de trabajo.</p>"
      );
    },
  });
}

// Función para mostrar las ofertas en la página
function displayOffers(ofertas) {
  let htmlContent = "";
  ofertas.forEach(function (oferta) {
    htmlContent += `
      <div class="card mb-4 shadow-sm oferta">
        <div class="card-body">
          <h5 class="card-title">${oferta.Titulo}</h5>
          <p class="card-text">${oferta.Descripcion}</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">Categoría: ${oferta.Categoria}</small>
            <small class="text-muted">Publicado el: ${new Date(
              oferta.FechaPublicacion
            ).toLocaleDateString()}</small>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary applyBtn" data-id="${
            oferta.ID
          }">Aplicar</button>
        </div>
      </div>
    `;
  });
  $("#offersContainer").html(htmlContent);
  attachApplyEventListeners();
}

// Función para adjuntar los escuchadores de eventos a los botones de aplicar
function attachApplyEventListeners() {
  $(".applyBtn").on("click", function () {
    const ofertaID = $(this).data("id");
    applyToOffer(ofertaID);
  });
}

// Función para manejar la aplicación a una oferta
function applyToOffer(ofertaID) {
  $.ajax({
    url: "/portal_empleo/assets/database/aplicar_oferta.php",
    type: "POST",
    dataType: "json",
    data: { ofertaID: ofertaID },
    success: function (response) {
      if (response.success) {
        alert("Aplicación registrada exitosamente.");
      } else {
        alert("Error al aplicar a la oferta: " + response.message);
      }
    },
    error: function () {
      alert(
        "Error al procesar la aplicación. Por favor, inténtalo de nuevo más tarde."
      );
    },
  });
}
