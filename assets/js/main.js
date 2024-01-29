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

// Espera a que se cargue completamente el contenido del DOM
document.addEventListener("DOMContentLoaded", function () {
  // Obtiene los elementos del formulario y del contenedor de ofertas
  const filterForm = document.getElementById("filterForm");
  const offersContainer = document.getElementById("offersContainer");

  // Agrega un evento de 'submit' al formulario de filtrado
  filterForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const keyword = document.getElementById("searchKeyword").value;
    const category = document.getElementById("categorySelect").value;

    filterOffers(keyword, category); // Llama a la función para filtrar ofertas
  });

  // Función para filtrar las ofertas basándose en la palabra clave y la categoría
  function filterOffers(keyword, category) {
    let filteredOffers = sampleOffers; // Comienza con todas las ofertas

    // Filtra por categoría si es específica
    if (category !== "all") {
      filteredOffers = filteredOffers.filter(
        (offer) => offer.category === category
      );
    }

    // Filtra por palabra clave si se proporciona una
    if (keyword) {
      filteredOffers = filteredOffers.filter(
        (offer) =>
          offer.title.toLowerCase().includes(keyword.toLowerCase()) ||
          offer.description.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    displayOffers(filteredOffers); // Muestra las ofertas filtradas
  }

  // Función para mostrar las ofertas en el HTML
  function displayOffers(offers) {
    offersContainer.innerHTML = ""; // Limpia el contenedor actual

    // Itera sobre cada oferta y la añade al contenedor
    offers.forEach((offer) => {
      const offerElement = document.createElement("div");
      offerElement.className = "offer";
      offerElement.innerHTML = `
                <h3>${offer.title}</h3>
                <p>${offer.description}</p>
            `;
      offersContainer.appendChild(offerElement);
    });
  }

  // Datos de muestra para las ofertas de trabajo
  const sampleOffers = [
    {
      title: "Desarrollador Frontend",
      category: "tecnologia",
      description: "Trabajo de desarrollo frontend usando React.",
    },
    {
      title: "Marketing Digital",
      category: "marketing",
      description: "Especialista en SEO y marketing en redes sociales.",
    },
    {
      title: "Analista de Datos",
      category: "tecnologia",
      description: "Análisis de grandes volúmenes de datos.",
    },
    // ...más ofertas...
  ];

  // Carga inicial de todas las ofertas
  filterOffers("", "all");
});

document.addEventListener("DOMContentLoaded", function () {
  // Validar formulario de Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      let valid = true;

      if (!email) {
        alert("Por favor, ingrese su correo electrónico.");
        valid = false;
      } else if (!password) {
        alert("Por favor, ingrese su contraseña.");
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
      }
    });
  }

  // Validar formulario de Registro
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      const name = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      let valid = true;

      if (!name) {
        alert("Por favor, ingrese su nombre.");
        valid = false;
      } else if (!email) {
        alert("Por favor, ingrese su correo electrónico.");
        valid = false;
      } else if (!password) {
        alert("Por favor, ingrese una contraseña.");
        valid = false;
      } else if (!passwordRegex.test(password)) {
        alert(
          "La contraseña debe tener al menos 8 caracteres, incluyendo un número, una letra mayúscula y una letra minúscula."
        );
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar todos los elementos que activan la ventana modal de inicio de sesión
  const loginTriggers = document.querySelectorAll(".login-trigger");

  // Añadir un evento de clic a cada uno
  loginTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (event) {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
      $("#loginModal").modal("show"); // Mostrar la ventana modal
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const applicationStatusElements = document.querySelectorAll(
    ".application-status"
  );

  applicationStatusElements.forEach((element) => {
    // Suponiendo que el ID de la aplicación está en un atributo data
    const applicationId = element.getAttribute("data-application-id");

    // Simula una llamada al servidor para obtener el estado actual
    // En un caso real, esto sería una solicitud AJAX
    fetchStatus(applicationId, (status) => {
      element.textContent = `Estado: ${status}`;
    });
  });

  function fetchStatus(applicationId, callback) {
    // Simulación de la obtención del estado de la aplicación
    // En un caso real, se enviaría una solicitud al servidor
    setTimeout(() => {
      const simulatedStatus = "En revisión"; // Esto sería el estado obtenido del servidor
      callback(simulatedStatus);
    }, 1000);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Selecciona el botón Close de la ventana modal
  const closeButton = document.getElementById("closeModalButton");

  // Asegúrate de que el botón existe
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      // Cierra la ventana modal
      $("#loginModal").modal("hide");
    });
  }
});
