// Get references to all the screens
const screenStart = document.getElementById("screenStart");
const screenPart0 = document.getElementById("screenPart0");
const screenPart1 = document.getElementById("screenPart1");
const screenPart2 = document.getElementById("screenPart2");
const screenPart3 = document.getElementById("screenPart3");
const screenFetchingResults = document.getElementById("screenFetchingResults");
const screenResult = document.getElementById("screenResult");
const screenError = document.getElementById("screenError");

// Referencias a la nueva pantalla de datos personales
const formPart0 = document.getElementById("formPart0");
let personalData = {};

// Initialize responses variable
let responses;
let responsesForWhatsapp;

// Flag de modo debug
const DEBUG_MODE = true; // Cambia a true para activar el autollenado

function autoFillInputs() {
  if (!DEBUG_MODE) return;
  // Parte 0 (datos personales)
  const nombre = document.getElementById("nombre");
  const edad = document.getElementById("edad");
  const sexo = document.getElementById("sexo");
  const estado_civil = document.getElementById("estado_civil");
  const hijos = document.getElementById("hijos");
  const profesion = document.getElementById("profesion");
  if (nombre) nombre.value = "Juan";
  if (edad) edad.value = "35";
  if (sexo) sexo.value = "Hombre";
  if (estado_civil) estado_civil.value = "Soltero";
  if (hijos) hijos.value = "0";
  if (profesion) profesion.value = "Ingeniero";
  // Parte 1
  const inputs1 = document.querySelectorAll("#list1 .rank-input");
  inputs1.forEach((input, idx) => {
    input.value = idx + 1;
  });
  // Parte 2
  const inputs2 = document.querySelectorAll("#list2 .rank-input");
  inputs2.forEach((input, idx) => {
    input.value = idx + 1;
  });
  // Parte 3
  const inputs3 = document.querySelectorAll("#list3 .rank-input");
  inputs3.forEach((input, idx) => {
    input.value = idx + 1;
  });
}

// Screen Start
document
  .getElementById("btn_ScreenStart_Continue")
  .addEventListener("click", () => {
    showScreen(screenStart, screenPart0);
    autoFillInputs();
  });

// Screen Part 0
formPart0.addEventListener("submit", function (e) {
  e.preventDefault();
  // Recoger datos personales
  personalData = {
    nombre: document.getElementById("nombre").value.trim(),
    edad: document.getElementById("edad").value.trim(),
    sexo: document.getElementById("sexo").value.trim(),
    estado_civil: document.getElementById("estado_civil").value.trim(),
    hijos: document.getElementById("hijos").value.trim(),
    profesion: document.getElementById("profesion").value.trim(),
  };
  // Ocultar parte 0 y mostrar Parte 1
  showScreen(screenPart0, screenPart1);
});

// Screen Part 1 - Continue button
document
  .getElementById("btn_ScreenPart1_Continue")
  .addEventListener("click", () => {
    showScreen(screenPart1, screenPart2);
  });

// Screen Part 2 - Continue button
document
  .getElementById("btn_ScreenPart2_Continue")
  .addEventListener("click", () => {
    showScreen(screenPart2, screenPart3);
  });

let parte3Omitida = false;

// Screen Part 3 - Skip button
// Al omitir la parte 3, marcar el flag y enviar respuestas con nulls

document
  .getElementById("btn_ScreenPart3_Skip")
  .addEventListener("click", () => {
    parte3Omitida = true;
    showScreen(screenPart3, screenFetchingResults);
    submitResponses();
  });

document
  .getElementById("btn_ScreenPart3_Continue")
  .addEventListener("click", () => {
    parte3Omitida = false;
    showScreen(screenPart3, screenFetchingResults);
    submitResponses();
  });

function validateAndToggleButton(listId, buttonId, errorId) {
  const inputs = document.querySelectorAll(`#${listId} .rank-input`);
  const values = Array.from(inputs).map((input) => parseInt(input.value, 10));
  const uniqueValues = new Set(values);
  const allFilled = values.every((v) => !isNaN(v) && v >= 1 && v <= 18);
  const noRepeats = uniqueValues.size === 18;
  const button = document.getElementById(buttonId);
  const error = document.getElementById(errorId);

  if (allFilled && noRepeats) {
    button.disabled = false;
    error.textContent = "";
  } else {
    button.disabled = true;
    if (!allFilled) {
      error.textContent = "Debes asignar un número del 1 al 18 a cada frase.";
    } else if (!noRepeats) {
      error.textContent = "No puede haber números repetidos.";
    } else {
      error.textContent = "";
    }
  }
}

function setupValidation(listId, buttonId, errorId) {
  const inputs = document.querySelectorAll(`#${listId} .rank-input`);
  inputs.forEach((input) => {
    input.addEventListener("input", () =>
      validateAndToggleButton(listId, buttonId, errorId)
    );
  });
  validateAndToggleButton(listId, buttonId, errorId);
}

// Agregar contenedores de error en el HTML (esto se puede hacer en el HTML si se prefiere)
document.addEventListener("DOMContentLoaded", () => {
  // Parte 1
  const part1List = document.getElementById("list1");
  if (!document.getElementById("errorPart1")) {
    const errorDiv = document.createElement("div");
    errorDiv.id = "errorPart1";
    errorDiv.style.color = "red";
    part1List.parentNode.insertBefore(errorDiv, part1List.nextSibling);
  }
  setupValidation("list1", "btn_ScreenPart1_Continue", "errorPart1");

  // Parte 2
  const part2List = document.getElementById("list2");
  if (!document.getElementById("errorPart2")) {
    const errorDiv = document.createElement("div");
    errorDiv.id = "errorPart2";
    errorDiv.style.color = "red";
    part2List.parentNode.insertBefore(errorDiv, part2List.nextSibling);
  }
  setupValidation("list2", "btn_ScreenPart2_Continue", "errorPart2");

  // Parte 3
  const part3List = document.getElementById("list3");
  if (!document.getElementById("errorPart3")) {
    const errorDiv = document.createElement("div");
    errorDiv.id = "errorPart3";
    errorDiv.style.color = "red";
    part3List.parentNode.insertBefore(errorDiv, part3List.nextSibling);
  }
  setupValidation("list3", "btn_ScreenPart3_Continue", "errorPart3");
  autoFillInputs();
  validateAndToggleButton("list1", "btn_ScreenPart1_Continue", "errorPart1");
  validateAndToggleButton("list2", "btn_ScreenPart2_Continue", "errorPart2");
  validateAndToggleButton("list3", "btn_ScreenPart3_Continue", "errorPart3");
});

// Deshabilitar los botones de continuar por defecto
document.getElementById("btn_ScreenPart1_Continue").disabled = true;
document.getElementById("btn_ScreenPart2_Continue").disabled = true;
document.getElementById("btn_ScreenPart3_Continue").disabled = true;

// Modificar submitResponses para recolectar los valores de los inputs
function submitResponses() {
  function getInputValues(listId) {
    const items = document.querySelectorAll(`#${listId} li`);
    return Array.from(items).map((li) => {
      const input = li.querySelector(".rank-input");
      return input.value ? parseInt(input.value, 10) : null;
    });
  }

  const idsScreenPart1 = getInputValues("list1");
  const idsScreenPart2 = getInputValues("list2");
  let idsScreenPart3;
  if (parte3Omitida) {
    idsScreenPart3 = Array(18).fill(null);
  } else {
    idsScreenPart3 = getInputValues("list3");
  }

  responses = [...idsScreenPart1, ...idsScreenPart2, ...idsScreenPart3];

  const payload = { responses };

  console.log("responses", responses);
  console.log("payload", payload);

  fetch("http://localhost:8080/quicktest", {
    // fetch("https://hidden-dusk-20667-4658d7b070f3.herokuapp.com/quicktest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(responses),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta del servidor:", data);
      showScreen(screenFetchingResults, screenResult);
    })
    .catch((error) => {
      console.error("Error en la petición:", error);
      screenFetchingResults.style.display = "none";
      screenError.style.display = "block";
      window.scrollTo(0, 0);
    });

  showScreen(screenFetchingResults, screenResult);
}

// Function to handle screen transitions
function showScreen(hideScreen, showScreen) {
  hideScreen.style.display = "none";
  showScreen.style.display = "block";
  window.scrollTo(0, 0);
}

// Mostrar primero la Parte 0
screenStart.style.display = "block";
