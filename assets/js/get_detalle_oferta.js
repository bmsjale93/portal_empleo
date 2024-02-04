$(document).ready(function () {
  var ofertaId = new URLSearchParams(window.location.search).get("id");
  if (ofertaId) {
    loadOfferDetails(ofertaId);
  } else {
    window.location.href =
      "/portal_empleo/ofertas_trabajo.php";
  }
});

function loadOfferDetails(ofertaId) {
  $.ajax({
    url: "/portal_empleo/assets/database/get_detalle_oferta.php",
    type: "GET",
    data: { id: ofertaId },
    dataType: "json",
    success: function (oferta) {
      if (oferta) {
        $("#hero-ofertas .hero-content h2").text(
          oferta.Titulo + " " + oferta.Categoria
        );
        $("#hero-ofertas .text-muted").text(
          "Publicado el " + oferta.FechaPublicacion
        );
        $(".section-ofertas .text-ofertas:nth-child(1) p").html(
          oferta.Descripcion
        );
        // Actualizar otros elementos según sea necesario
      } else {
        // Manejar el caso de que no se encuentre la oferta
      }
    },
    error: function () {
      // Manejar errores
    },
  });
}
