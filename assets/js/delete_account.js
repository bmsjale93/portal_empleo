function deleteAccount() {
  const confirmation = confirm(
    "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
  );
  if (confirmation) {
    fetch("/portal_empleo/assets/database/delete_account.php", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          window.location.href = "/portal_empleo/index.php";
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Hubo un problema al eliminar la cuenta.");
      });
  }
}
