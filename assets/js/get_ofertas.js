$(document).ready(function () {
  loadOffers();

  // Capturar el evento de envío del formulario
  $("#filterForm").on("submit", function (e) {
    e.preventDefault();
    const selectedCategory = $("#categorySelect").val();
    loadOffers(selectedCategory);
  });
});

// Modificar la función loadOffers para aceptar un parámetro de categoría
function loadOffers(category = "all") {
  let url = "/portal_empleo/assets/database/get_ofertas.php";
  if (category !== "all") {
    url += `?category=${category}`;
  }

  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    success: function (data) {
      if (!data.error) {
        displayOffers(data);
      } else {
        $("#offersContainer").html(
          "<p>No se encontraron ofertas de trabajo.</p>"
        );
      }
    },
    error: function () {
      $("#offersContainer").html(
        "<p>Hubo un error al cargar las ofertas de trabajo.</p>"
      );
    },
  });
}

/// Función para mostrar las ofertas en la página
function displayOffers(ofertas) {
  let htmlContent = "";
  ofertas.forEach(function (oferta) {
    // Generar la URL de la página de detalles de la oferta con el ID de la oferta
    const ofertaURL = `/portal_empleo/oferta.php?id=${oferta.ID}`;
    htmlContent += `
    <div class="card mb-4 shadow oferta">
      <div class="card-header text-white bg-primary">
        <h5 class="card-title mb-0">${oferta.Titulo}</h5>
      </div>
      <div class="card-body">
        <p class="card-text">${oferta.Descripcion.substring(0, 150)}...</p>
        <div class="d-flex justify-content-between align-items-center mt-3">
          <small class="text-muted">Categoría: ${oferta.Categoria}</small>
          <small class="text-muted">Publicado: ${new Date(
            oferta.FechaPublicacion
          ).toLocaleDateString()}</small>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-around">
        <a href="${ofertaURL}" class="btn btn-primary flex-grow-1 mr-2">Ver Detalles</a>
        <button class="btn btn-success flex-grow-1 ml-2 applyBtn" data-id="${
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
