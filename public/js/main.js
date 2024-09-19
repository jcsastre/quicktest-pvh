// Get references to all the screens
const screenStart = document.getElementById("screenStart");
const screenPart1 = document.getElementById("screenPart1");
const screenPart2 = document.getElementById("screenPart2");
const screenPart3 = document.getElementById("screenPart3");
const screenFetchingResults = document.getElementById("screenFetchingResults");
const screenResult = document.getElementById("screenResult");
const screenError = document.getElementById("screenError");

// Initialize responses variable
let responses;
let responsesForWhatsapp;

// Screen Start
document
  .getElementById("btn_ScreenStart_Continue")
  .addEventListener("click", () => {
    showScreen(screenStart, screenPart1);
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
    const urlParams = new URLSearchParams(window.location.search);
    const showMundoSexual = urlParams.get("ms") === "true";

    if (showMundoSexual) {
      showScreen(screenPart2, screenPart3);
    } else {
      showScreen(screenPart2, screenFetchingResults);
      submitResponses();
    }
  });

// Screen Part 3 - Skip button
document
  .getElementById("btn_ScreenPart3_Skip")
  .addEventListener("click", () => {
    showScreen(screenPart3, screenFetchingResults);
    submitResponses();
  });

// Screen Part 3 - Continue button
document
  .getElementById("btn_ScreenPart3_Continue")
  .addEventListener("click", () => {
    showScreen(screenPart3, screenFetchingResults);
    submitResponses();
  });

function submitResponses() {
  const itemsScreenPart1 = document.querySelectorAll("#sortable1 li");
  const idsScreenPart1 = Array.from(itemsScreenPart1).map((item) => item.id);

  const itemsScreenPart2 = document.querySelectorAll("#sortable2 li");
  const idsScreenPart2 = Array.from(itemsScreenPart2).map((item) => item.id);

  const itemsScreenPart3 = document.querySelectorAll("#sortable3 li");
  const idsScreenPart3 = Array.from(itemsScreenPart3).map((item) => item.id);

  responses = [...idsScreenPart1, ...idsScreenPart2];
  responsesForWhatsapp = [
    ...idsScreenPart1,
    " / ",
    ...idsScreenPart2,
    " / ",
    ...idsScreenPart3, // part 3 responses only relevant for sending why whatsapp, not supported by backend
  ];

  const payload = { responses };

  console.log("responses", responses);
  console.log("payload", payload);

  //fetch("http://localhost:8080/quicktest", {
  fetch("https://hidden-dusk-20667-4658d7b070f3.herokuapp.com/quicktest", {
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

      document.getElementById(`me_dimi`).textContent = data[0];
      document.getElementById(`me_dime`).textContent = data[1];
      document.getElementById(`me_dims`).textContent = data[2];
      document.getElementById(`mi_dimi`).textContent = data[3];
      document.getElementById(`mi_dime`).textContent = data[4];
      document.getElementById(`mi_dims`).textContent = data[5];
    })
    .catch((error) => {
      console.error("Error en la petición:", error);
      screenFetchingResults.style.display = "none";
      screenError.style.display = "block";
      window.scrollTo(0, 0);
    });
}

// Configurar SortableJS para listas
function initializeSortable(listId) {
  const list = document.getElementById(listId);

  // Inicializa SortableJS en la lista
  new Sortable(list, {
    animation: 150,
    ghostClass: "sortable-ghost", // Clase aplicada al elemento que se está arrastrando
    onEnd: function (evt) {
      // Opcional: Código a ejecutar después de que el elemento se haya soltado
      console.log(`Elemento movido de ${evt.oldIndex} a ${evt.newIndex}`);
    },
  });
}

function openWhatsAppJustInformation() {
  const phoneNumber = "673428633";
  const message =
    "Hola, estoy interesada en obtener más información sobre el test para evaluar mis mundos externo e interno";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank");
}

function openWhatsAppInformationAndResponses() {
  const phoneNumber = "673428633";
  const message = `Hola, he realizado el test (respuestas: ${responsesForWhatsapp}) y estoy interesada en obtener más información`;
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank");
}

function openWhatsAppError() {
  const phoneNumber = "673428633";
  const message = "Hola, me sale un error al intentar realizar el test";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank");
}

// Function to handle screen transitions
function showScreen(hideScreen, showScreen) {
  hideScreen.style.display = "none";
  showScreen.style.display = "block";
  window.scrollTo(0, 0);
}

// Startup
screenStart.style.display = "block";
initializeSortable("sortable1");
initializeSortable("sortable2");
initializeSortable("sortable3");
