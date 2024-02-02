// Slider para Clientes
document.addEventListener("DOMContentLoaded", function () {
  var clientsSwiper = new Swiper(".clients-slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // Responsive breakpoints
    breakpoints: {
      // when window width is <= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      // when window width is <= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is <= 1024px
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});


// Slider para Testimonios
document.addEventListener("DOMContentLoaded", function () {
  var mySwiper = new Swiper(".testimonials-slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // Responsive breakpoints
    breakpoints: {
      // when window width is <= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      // when window width is <= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is <= 1024px
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});

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

  // Validación del formulario de registro
  const registerFormModal = document.getElementById("registerFormModal");

    registerFormModal.addEventListener("submit", function(e) {
        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const country = document.getElementById("country").value;
        const postalCode = document.getElementById("postalCode").value;
        const phone = document.getElementById("phone").value;

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{7,}$/; // Ajusta según el formato deseado

        let valid = true;
        let errorMessage = "";

        if (!name) {
            errorMessage += "Por favor, ingrese su nombre.\n";
            valid = false;
        }
        if (!email || !emailRegex.test(email)) {
            errorMessage += "Por favor, ingrese un correo electrónico válido.\n";
            valid = false;
        }
        if (!password || !passwordRegex.test(password)) {
            errorMessage += "La contraseña debe tener al menos 8 caracteres, incluyendo un número, una letra mayúscula y una letra minúscula.\n";
            valid = false;
        }
        if (password !== confirmPassword) {
            errorMessage += "Las contraseñas no coinciden.\n";
            valid = false;
        }
        if (!address) {
            errorMessage += "Por favor, ingrese su dirección.\n";
            valid = false;
        }
        if (!city) {
            errorMessage += "Por favor, ingrese su ciudad.\n";
            valid = false;
        }
        if (!country) {
            errorMessage += "Por favor, ingrese su país.\n";
            valid = false;
        }
        if (!postalCode) {
            errorMessage += "Por favor, ingrese su código postal.\n";
            valid = false;
        }
        if (!phone || !phoneRegex.test(phone)) {
            errorMessage += "Por favor, ingrese un número de teléfono válido.\n";
            valid = false;
        }

        if (!valid) {
            alert(errorMessage);
            e.preventDefault();
        }
    });
});

$(document).ready(function () {
  // Función para ir al paso indicado
  window.goToStep = function (step) {
    // Ocultar todos los pasos
    $("#step1, #step2, #step3").hide();
    // Mostrar el paso actual
    $("#step" + step).show();
  };

  // Validar paso antes de avanzar
  function validateStep(step) {
    let isValid = true; // asumir que el paso es válido inicialmente
    switch (step) {
      case 1:
        // Validar paso 1: Información básica
        if (
          $("#registerName").val().trim() === "" ||
          $("#registerEmail").val().trim() === "" ||
          $("#registerPassword").val().trim() === "" ||
          $("#confirmPassword").val().trim() === "" ||
          $("#phone").val().trim() === "" ||
          $("#registerPassword").val() !== $("#confirmPassword").val()
        ) {
          isValid = false;
          alert("Por favor, complete todos los campos correctamente.");
        }
        break;
      case 2:
        // Validar paso 2: Dirección
        if (
          $("#address").val().trim() === "" ||
          $("#city").val().trim() === "" ||
          $("#country").val().trim() === ""
        ) {
          isValid = false;
          alert("Por favor, complete todos los campos de dirección.");
        }
        break;
      case 3:
        // Validar paso 3: Tipo de usuario
        if ($("#userType").val().trim() === "") {
          isValid = false;
          alert("Por favor, seleccione un tipo de usuario.");
        }
        break;
    }
    return isValid;
  }

  // Controlar la navegación entre pasos
  $("#registerFormModal")
    .find("button")
    .click(function (e) {
      let currentStep = $(this)
        .closest('div[id^="step"]')
        .attr("id")
        .replace("step", "");
      let targetStep =
        $(this).text() === "Siguiente"
          ? parseInt(currentStep) + 1
          : parseInt(currentStep) - 1;

      // Validar el paso actual antes de avanzar
      if (validateStep(parseInt(currentStep))) {
        goToStep(targetStep);
      } else {
        e.preventDefault(); // Prevenir la acción por defecto si la validación falla
      }
    });

  // Enviar formulario
  $("#registerFormModal").submit(function (e) {
    // Asegurarse de que el último paso es válido antes de enviar
    if (!validateStep(3)) {
      e.preventDefault(); // Prevenir el envío si la validación falla
      return false;
    }
    // Aquí se puede agregar el código para enviar el formulario, como una llamada AJAX.
  });
});



document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar todos los elementos que activan la ventana modal de inicio de sesión
  const loginTriggers = document.querySelectorAll(".login-trigger");

  // Añadir un evento de clic a cada uno para el login
  loginTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (event) {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
      $("#loginModal").modal("show"); // Mostrar la ventana modal de inicio de sesión
    });
  });

  // Seleccionar todos los elementos que activan la ventana modal de registro
  const registerTriggers = document.querySelectorAll(".register-trigger");

  // Añadir un evento de clic a cada uno para el registro
  registerTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (event) {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
      $("#registerModal").modal("show"); // Mostrar la ventana modal de registro
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

document.addEventListener("DOMContentLoaded", function () {
  var navToggle = document.querySelector(".mobile-nav-toggle");
  var navbarMobile = document.querySelector(".navbar-mobile");
  var navbar = document.querySelector(".navbar");

  // Función para cambiar la visibilidad del menú
  function toggleMenu() {
    var isVisible = navbarMobile.style.display === "block";
    navbarMobile.style.display = isVisible ? "none" : "block";

    // Cambiar clases del botón
    if (isVisible) {
      navToggle.classList.remove("fa-times");
      navToggle.classList.add("fa-bars");
    } else {
      navToggle.classList.remove("fa-bars");
      navToggle.classList.add("fa-times");
    }
  }

  navToggle.addEventListener("click", toggleMenu);

  // Ajustar visibilidad del menú al cambiar el tamaño de la ventana
  window.addEventListener("resize", function () {
    if (window.innerWidth > 991) {
      navbarMobile.style.display = "none";
      navbar.style.display = "block";
    } else {
      navbar.style.display = "none";
    }
  });
});
