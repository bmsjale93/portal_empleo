/********************************************************************************
 * ESTADO DE LA APLICACIÓN
 ********************************************************************************/

document.addEventListener("DOMContentLoaded", function () {
  updateApplicationStatuses();
});

/**
 * Actualiza los estados de las aplicaciones en la página.
 */
function updateApplicationStatuses() {
  const applicationStatusElements = document.querySelectorAll(
    ".application-status"
  );

  applicationStatusElements.forEach((element) => {
    const applicationId = element.getAttribute("data-application-id");
    fetchStatus(applicationId, (status) => {
      element.textContent = `Estado: ${status}`;
    });
  });
}

/**
 * Simula la obtención del estado de una aplicación desde el servidor.
 * @param {string} applicationId El ID de la aplicación cuyo estado se está consultando.
 * @param {Function} callback Función de callback que maneja el estado obtenido.
 */
function fetchStatus(applicationId, callback) {
  // Simulación de una solicitud AJAX para obtener el estado de la aplicación
  setTimeout(() => {
    const simulatedStatus = "En revisión"; // Simulación del estado obtenido del servidor
    callback(simulatedStatus);
  }, 1000);
}
