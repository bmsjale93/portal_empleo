/********************************************************************************
 * SLIDERS PARA LA WEB
 *******************************************************************************/

/**
 * Inicializa el slider para la sección Hero.
 */
document.addEventListener("DOMContentLoaded", function () {
  var heroSwiper = new Swiper(".hero-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false, // Continuar autoplay después de la interacción del usuario
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

/**
 * Inicializa el slider para la sección de Clientes.
 * Configura responsive breakpoints para adaptarse a diferentes anchos de pantalla.
 */
document.addEventListener("DOMContentLoaded", function () {
  var clientsSwiper = new Swiper(".clients-slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      480: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});

/**
 * Inicializa el slider para la sección de Testimonios.
 */
document.addEventListener("DOMContentLoaded", function () {
  var testimonialsSwiper = new Swiper(".testimonials-slider", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      480: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});


/********************************************************************************
* FUNCIÓN PARA NOTIFICACIONES
 *******************************************************************************/

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


/********************************************************************************
* FUNCIÓN PARA MOSTRAR/FILTRAR OFERTAS
 *******************************************************************************/

document.addEventListener("DOMContentLoaded", function () {
    // Inicialización de elementos del DOM
    initFormAndDisplayOffers();
});

function initFormAndDisplayOffers() {
    const filterForm = document.getElementById("filterForm");
    const offersContainer = document.getElementById("offersContainer");

    // Manejo del evento submit del formulario
    filterForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto
        const keyword = document.getElementById("searchKeyword").value;
        const category = document.getElementById("categorySelect").value;
        filterAndDisplayOffers(keyword, category, offersContainer);
    });

    // Datos de muestra para las ofertas de trabajo
    const sampleOffers = [
        { title: "Desarrollador Frontend", category: "tecnologia", description: "Trabajo de desarrollo frontend usando React." },
        { title: "Marketing Digital", category: "marketing", description: "Especialista en SEO y marketing en redes sociales." },
        { title: "Analista de Datos", category: "tecnologia", description: "Análisis de grandes volúmenes de datos." },
        // Añadir más ofertas según sea necesario
    ];

    // Mostrar todas las ofertas inicialmente
    filterAndDisplayOffers("", "all", offersContainer, sampleOffers);
}

/**
 * Filtra y muestra las ofertas basándose en la palabra clave y la categoría seleccionada.
 * @param {string} keyword Palabra clave para la búsqueda.
 * @param {string} category Categoría seleccionada para filtrar.
 * @param {HTMLElement} container Elemento contenedor donde se mostrarán las ofertas.
 * @param {Array} offers Lista de ofertas para filtrar y mostrar.
 */
function filterAndDisplayOffers(keyword, category, container, offers) {
    let filteredOffers = filterOffers(keyword, category, offers);
    displayOffers(filteredOffers, container);
}

/**
 * Filtra las ofertas por palabra clave y categoría.
 * @param {string} keyword Palabra clave para la búsqueda.
 * @param {string} category Categoría para filtrar.
 * @param {Array} offers Lista de ofertas.
 * @returns {Array} Ofertas filtradas.
 */
function filterOffers(keyword, category, offers) {
    return offers.filter(offer => {
        const matchesKeyword = keyword ? offer.title.toLowerCase().includes(keyword.toLowerCase()) || 
        offer.description.toLowerCase().includes(keyword.toLowerCase()) : true;
        
        const matchesCategory = category !== "all" ? offer.category === category : true;
        return matchesKeyword && matchesCategory;
    });
}

/**
 * Muestra las ofertas filtradas en el HTML.
 * @param {Array} offers Ofertas para mostrar.
 * @param {HTMLElement} container Elemento contenedor para las ofertas.
 */
function displayOffers(offers, container) {
    container.innerHTML = ""; // Limpia el contenedor de ofertas

    offers.forEach(offer => {
        const offerElement = document.createElement("div");
        offerElement.className = "offer";
        offerElement.innerHTML = `<h3>${offer.title}</h3><p>${offer.description}</p>`;
        container.appendChild(offerElement);
    });
}


/********************************************************************************
 * VALIDAR FORMULARIO DE LOGIN
 *******************************************************************************/

function updateUIAfterLogin(userName) {
  // Ocultar botones de iniciar sesión y registrarse
  $(".login-trigger").parent().hide();
  $(".register-trigger").parent().hide();

  // Añadir mensaje de bienvenida
  var welcomeMessage = `<li><a href="#">Bienvenido, ${userName}</a></li>`;
  $("#navbar ul").append(welcomeMessage);

  // Opción adicional: cerrar modal con JavaScript nativo si jQuery no funciona
  var loginModal = document.getElementById("loginModal");
  $(loginModal).modal("hide"); // Intenta cerrar el modal con jQuery
  if (loginModal) loginModal.style.display = "none"; // Fallback con JavaScript puro

  // Asegúrate de que el modal se cierra correctamente
  $("body").removeClass("modal-open");
  $(".modal-backdrop").remove();
}


$(document).ready(function () {
  $("#loginButton").click(function (e) {
    var email = $("#emailModal").val();
    var password = $("#passwordModal").val();

    $.ajax({
      type: "POST",
      url: "login_user.php",
      data: {
        email: email,
        password: password,
      },
      success: function (response) {
        var data = JSON.parse(response);
        if (data.success) {
          updateUIAfterLogin(data.userName);
        } else {
          alert("Usuario o contraseña incorrectos");
        }
      },
      error: function () {
        alert("Error en la solicitud AJAX.");
      },
    });
  });
});




/********************************************************************************
 * FORMULARIO DE REGISTRO
 ********************************************************************************/


document.addEventListener("DOMContentLoaded", function () {
  initializeRegistrationFormValidation();
});

function initializeRegistrationFormValidation() {
  const registerFormModal = document.getElementById("registerFormModal");

  registerFormModal.addEventListener("submit", function (e) {
    if (!validateRegistrationForm()) {
      e.preventDefault();
    } else {
    }
  });
}

/**
 * Valida todos los campos del formulario de registro y muestra mensajes de error si es necesario.
 * @return {boolean} Retorna verdadero si todos los campos son válidos, de lo contrario falso.
 */
function validateRegistrationForm() {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,}$/;

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    const postalCode = document.getElementById("postalCode").value;
    const phone = document.getElementById("phone").value;
    const userType = document.getElementById("userType").value;

  // Validación de campos
  let errorMessage = "";
  if (!name) errorMessage += "Por favor, ingrese su nombre.\n";
  if (!email || !emailRegex.test(email))
    errorMessage += "Por favor, ingrese un correo electrónico válido.\n";
  if (!password || !passwordRegex.test(password))
    errorMessage +=
      "La contraseña debe tener al menos 8 caracteres, incluyendo un número, una letra mayúscula y una letra minúscula.\n";
  if (password !== confirmPassword)
    errorMessage += "Las contraseñas no coinciden.\n";
  if (!address) errorMessage += "Por favor, ingrese su dirección.\n";
  if (!city) errorMessage += "Por favor, ingrese su ciudad.\n";
  if (!country) errorMessage += "Por favor, ingrese su país.\n";
  if (!postalCode) errorMessage += "Por favor, ingrese su código postal.\n";
  if (!phone || !phoneRegex.test(phone))
    errorMessage += "Por favor, ingrese un número de teléfono válido.\n";

  if (errorMessage) {
    alert(errorMessage);
    return false;
  }
  return true;
}

/********************************************************************************
 * NAVEGACIÓN POR PASOS EN EL FORMULARIO DE REGISTRO
 ********************************************************************************/

$(document).ready(function () {
  initializeStepNavigation();
  goToStep(1); // Inicializar en el paso 1
});

function initializeStepNavigation() {
  // Controlar la navegación entre pasos
  $("#registerFormModal")
    .find("button")
    .click(function (e) {
      navigateSteps(this, e);
    });
}

function navigateSteps(element, event) {
  const currentStep = $(element)
    .closest('div[id^="step"]')
    .attr("id")
    .replace("step", "");
  const isNext = $(element).text().includes("Siguiente");
  const targetStep = isNext
    ? parseInt(currentStep) + 1
    : parseInt(currentStep) - 1;

  // Validar el paso actual antes de avanzar o retroceder
  if (validateStep(parseInt(currentStep))) {
    goToStep(targetStep);
  } else {
    event.preventDefault(); // Prevenir la acción por defecto si la validación falla
  }
}

/**
 * Valida el paso actual del formulario antes de avanzar.
 * Se asume que cada "step" contiene campos específicos que deben ser validados.
 * @param {number} step El paso actual que se va a validar.
 * @return {boolean} Retorna verdadero si el paso es válido, de lo contrario falso.
 */
function validateStep(step) {
    let isValid = true; // Inicialmente asumimos que el paso es válido
    let errorMessage = ""; // Mensaje de error acumulativo

    switch (step) {
        case 1:
            // Validación para el Paso 1: Información Básica
            if ($("#registerName").val().trim() === "") {
                errorMessage += "Por favor, ingrese su nombre.\n";
                isValid = false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("#registerEmail").val().trim())) {
                errorMessage += "Por favor, ingrese un correo electrónico válido.\n";
                isValid = false;
            }
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test($("#registerPassword").val())) {
                errorMessage += "La contraseña debe tener al menos 8 caracteres, incluyendo un número, una letra mayúscula y una letra minúscula.\n";
                isValid = false;
            }
            if ($("#registerPassword").val() !== $("#confirmPassword").val()) {
                errorMessage += "Las contraseñas no coinciden.\n";
                isValid = false;
            }
            break;
        case 2:
            // Validación para el Paso 2: Dirección
            if ($("#address").val().trim() === "") {
                errorMessage += "Por favor, ingrese su dirección.\n";
                isValid = false;
            }
            if ($("#city").val().trim() === "") {
                errorMessage += "Por favor, ingrese su ciudad.\n";
                isValid = false;
            }
            if ($("#country").val().trim() === "") {
                errorMessage += "Por favor, ingrese su país.\n";
                isValid = false;
            }
            break;
        case 3:
            // Validación para el Paso 3: Información Adicional
            if ($("#postalCode").val().trim() === "") {
                errorMessage += "Por favor, ingrese su código postal.\n";
                isValid = false;
            }
            if (!/^[0-9]{7,}$/.test($("#phone").val().trim())) {
                errorMessage += "Por favor, ingrese un número de teléfono válido.\n";
                isValid = false;
            }
            if ($("#userType").val().trim() === "") {
                errorMessage += "Por favor, seleccione un tipo de usuario.\n";
                isValid = false;
            }
            break;
        default:
            console.error("Paso no reconocido: ", step);
            isValid = false;
    }

    // Mostrar el mensaje de error si el paso no es válido
    if (!isValid) {
        alert(errorMessage);
    }

    return isValid;
}


/**
 * Actualiza la vista para mostrar el paso indicado del formulario.
 * @param {number} step El número del paso a mostrar.
 */
function goToStep(step) {
  // Ocultar todos los pasos
  $("#step1, #step2, #step3").hide();
  // Mostrar el paso actual
  $("#step" + step).show();
  // Actualizar la barra de progreso
  updateProgressBar(step);
}

/**
 * Actualiza la barra de progreso del formulario de registro según el paso actual.
 * @param {number} step El paso actual del formulario.
 */
function updateProgressBar(step) {
  const percentage = step === 1 ? 33 : step === 2 ? 66 : 100;
  $("#progressBar")
    .css("width", percentage + "%")
    .attr("aria-valuenow", percentage)
    .text(`Paso ${step} de 3`);
}

/********************************************************************************
 * ENVIO DE FORMULARIO DE REGISTRO
 ********************************************************************************/

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerFormModal");
  registerForm.removeEventListener("submit", handleFormSubmit);
  registerForm.addEventListener("submit", handleFormSubmit);
});

function handleFormSubmit(e) {
  e.preventDefault(); // Prevenir el envío normal del formulario
  
  // Lógica de validación y envío del formulario aquí
  if (validateRegistrationForm()) {
    const formData = new FormData(registerForm);

    fetch('register_user.php', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        updateUIAfterLogin(data.userName);
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("Ocurrió un error al procesar tu registro. Intenta de nuevo.");
    });
  }
}

/********************************************************************************
 * VENTANAS EMERGENTES PARA LOGIN Y REGISTRO
 ********************************************************************************/

document.addEventListener("DOMContentLoaded", function () {
  setupModalTriggers();
  setupModalCloseButton();
});

function setupModalTriggers() {
  // Configura los disparadores para el modal de login
  document.querySelectorAll(".login-trigger").forEach(trigger => {
    trigger.addEventListener("click", event => {
      event.preventDefault();
      $("#loginModal").modal("show");
    });
  });

  // Configura los disparadores para el modal de registro
  document.querySelectorAll(".register-trigger").forEach(trigger => {
    trigger.addEventListener("click", event => {
      event.preventDefault();
      $("#registerModal").modal("show");
    });
  });
}

function setupModalCloseButton() {
  // Selecciona el botón Close de la ventana modal y cierra la ventana modal
  const closeButton = document.getElementById("closeModalButton");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      $("#loginModal").modal("hide");
    });
  }
}


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
  const applicationStatusElements = document.querySelectorAll(".application-status");

  applicationStatusElements.forEach(element => {
    const applicationId = element.getAttribute("data-application-id");
    fetchStatus(applicationId, status => {
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

/********************************************************************************
 * MENU RESPONSIVE
 ********************************************************************************/

document.addEventListener("DOMContentLoaded", function () {
  setupMobileNavigation();
});

/**
 * Configura la navegación móvil, incluyendo el toggle del menú y ajustes de visibilidad basados en el tamaño de la ventana.
 */
function setupMobileNavigation() {
  const navToggle = document.querySelector(".mobile-nav-toggle");
  const navbarMobile = document.querySelector(".navbar-mobile");
  const navbar = document.querySelector(".navbar");

  /**
   * Cambia la visibilidad del menú móvil y ajusta las clases del botón de toggle.
   */
  function toggleMenu() {
    const isVisible = navbarMobile.style.display === "block";
    navbarMobile.style.display = isVisible ? "none" : "block";
    navToggle.classList.toggle("fa-times", !isVisible);
    navToggle.classList.toggle("fa-bars", isVisible);
  }

  navToggle.addEventListener("click", toggleMenu);

  /**
   * Ajusta la visibilidad del menú móvil y del menú principal en función del tamaño de la ventana.
   */
  function adjustMenuVisibility() {
    if (window.innerWidth > 991) {
      navbarMobile.style.display = "none";
      navbar.style.display = "block";
    } else {
      navbar.style.display = "none";
    }
  }

  window.addEventListener("resize", adjustMenuVisibility);

  // Asegura que el menú se ajuste correctamente al cargar la página.
  adjustMenuVisibility();
}