function borrarCurriculum(idCurriculum) {
  if (confirm("¿Estás seguro de que quieres borrar este currículum?")) {
    fetch("/portal_empleo/assets/database/delete_cv.php", {
      method: "POST",
      body: JSON.stringify({ id: idCurriculum }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Currículum borrado con éxito.");
          window.location.reload();
        } else {
          alert("Error al borrar el currículum.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al borrar el currículum.");
      });
  }
}
