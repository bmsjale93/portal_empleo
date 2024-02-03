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