function aplicarOferta(ofertaID) {
    if (!confirm("¿Estás seguro de que quieres aplicar a esta oferta?")) return;

    $.ajax({
      url: "/portal_empleo/assets/database/aplicar_oferta.php",
      type: "POST",
      data: { ofertaID: ofertaID },
      dataType: "json",
      success: function (response) {
        if (response.success) {
          alert("Has aplicado exitosamente.");
        } else {
          alert(response.message);
        }
      },
      error: function () {
        alert("Hubo un error al aplicar a la oferta.");
      },
    });
}
