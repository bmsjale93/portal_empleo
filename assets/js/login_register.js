/********************************************************************************
 * Scripts para el manejo de formularios de registro e inicio de sesión
 * Incluye validaciones, navegación por pasos y lógica de envío AJAX.
 ********************************************************************************/

// Utilidades de Validación
function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isPasswordValid(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}

function isPhoneNumberValid(phone) {
  return /^[0-9]{7,}$/.test(phone);
}

// Alerta de Mensajes
function showAlert(message) {
  alert(message);
}

// Actualización de UI después del Login (Modificada)
function updateUIAfterLogin(username) {
    $(".login-trigger, .register-trigger").closest("li").hide();
    const welcomeMessage = `<li><a href="#">Bienvenido, ${username}</a></li>`;
    $("#navbar ul").append(welcomeMessage);
    $("#loginModal").modal("hide");
    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();
}

// Inicio de Sesión (Modificado para incluir el nombre del usuario)
$(document).ready(function () {
    $("#login-modal-container").load("loginModal.html", function () {
        $("#loginFormModal").submit(function (e) {
            e.preventDefault();

            const email = $("#emailModal").val();
            const password = $("#passwordModal").val();

            $.ajax({
                type: "POST",
                url: "/portal_empleo/assets/database/login_user.php",
                data: { email, password },
                dataType: 'json', // Asegúrate de que la respuesta se trate como JSON
                success: function (data) {
                    if (data.success) {
                        // Asume que el servidor devuelve el nombre del usuario en caso de éxito
                        updateUIAfterLogin(data.username); // Modifica para pasar el nombre del usuario
                    } else {
                        showAlert(data.message);
                    }
                },
                error: function (_jqXHR, textStatus, errorThrown) {
                    showAlert("Error en la solicitud AJAX: " + textStatus + ", " + errorThrown);
                },
            });
        });
    });
});


// Registro
$(document).ready(function () {
  $("#register-modal-container").load("registerModal.html", function () {
    initializeRegistrationFormValidation();
  });
});

function initializeRegistrationFormValidation() {
  const registerForm = document.getElementById("registerFormModal");
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateRegistrationForm()) {
      e.preventDefault();
    } else {
    } 
  });

  initializeStepNavigation();
}

// Validación del Formulario de Registro
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

// Navegación por Pasos en el Formulario de Registro
function initializeStepNavigation() {
  $("#registerFormModal")
    .find("button")
    .click(function (e) {
      navigateSteps(this, e);
    });
  goToStep(1); // Inicializar en el paso 1
}

function navigateSteps(button, event) {
  const currentStep = $(button)
    .closest('div[id^="step"]')
    .attr("id")
    .replace("step", "");
  const isNext = $(button).text().includes("Siguiente");
  const targetStep = isNext
    ? parseInt(currentStep) + 1
    : parseInt(currentStep) - 1;

  if (validateStep(parseInt(currentStep))) {
    goToStep(targetStep);
  } else {
    event.preventDefault(); // Prevenir la acción por defecto si la validación falla
  }
}

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
      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("#registerEmail").val().trim())
      ) {
        errorMessage += "Por favor, ingrese un correo electrónico válido.\n";
        isValid = false;
      }
      if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
          $("#registerPassword").val()
        )
      ) {
        errorMessage +=
          "La contraseña debe tener al menos 8 caracteres, incluyendo un número, una letra mayúscula y una letra minúscula.\n";
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

function goToStep(step) {
  // Ocultar todos los pasos y mostrar el actual
  $('[id^="step"]').hide();
  $("#step" + step).show();
  updateProgressBar(step);
}

// Actualizar la Barra de Progreso del Formulario
function updateProgressBar(step) {
  const percentage = step === 1 ? 33 : step === 2 ? 66 : 100;
  $("#progressBar")
    .css("width", percentage + "%")
    .attr("aria-valuenow", percentage)
    .text(`Paso ${step} de 3`);
}