/***********************************
* FUNCIÓN PARA NOTIFICACIONES
***********************************/

// Función para mostrar una notificación
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Eliminar la notificación después de un tiempo
  setTimeout(() => {
    notification.remove();
  }, 3000);
}