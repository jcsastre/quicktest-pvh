const screenStart = document.getElementById("screenStart");
const screenPart1 = document.getElementById("screenPart1");
const screenPart1Review = document.getElementById("screenPart1Review");
const screenPart2 = document.getElementById("screenPart2");
const screenPart2Review = document.getElementById("screenPart2Review");
const screenFetchingResults = document.getElementById("screenFetchingResults");
const screenResult = document.getElementById("screenResult");
const screenError = document.getElementById("screenError");

// Screen Start
document
  .getElementById("btn_ScreenStart_Continue")
  .addEventListener("click", () => {
    screenStart.style.display = "none";
    screenPart1.style.display = "block";
    window.scrollTo(0, 0);
  });

// Screen Part 1
document
  .getElementById("btn_ScreenPart1_Continue")
  .addEventListener("click", () => {
    screenPart1.style.display = "none";
    screenPart2.style.display = "block";
    window.scrollTo(0, 0);
  });

let responses;

// Screen Part 2
document
  .getElementById("btn_ScreenPart2_Continue")
  .addEventListener("click", () => {
    screenPart2.style.display = "none";
    screenFetchingResults.style.display = "block";
    window.scrollTo(0, 0);

    const itemsScreen2 = document.querySelectorAll("#sortable1 li");
    const idsScreen2 = Array.from(itemsScreen2).map((item) => item.id);

    const itemsScreen3 = document.querySelectorAll("#sortable2 li");
    const idsScreen3 = Array.from(itemsScreen3).map((item) => item.id);

    responses = [...idsScreen2, ...idsScreen3];
    const payload = { responses };

    // Mostrar los identificadores en la consola
    console.log("responses", responses);
    console.log("payload", payload);

    // Realizar la petición HTTP GET
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
        screenFetchingResults.style.display = "none";
        screenResult.style.display = "block";
        // Procesar y mostrar los resultados en la pantalla de resultados
        document.getElementById(`me_dimi`).textContent = data[0];
        document.getElementById(`me_dime`).textContent = data[1];
        document.getElementById(`me_dims`).textContent = data[2];
        document.getElementById(`mi_dimi`).textContent = data[3];
        document.getElementById(`mi_dime`).textContent = data[4];
        document.getElementById(`mi_dims`).textContent = data[5];

        //document.getElementById(`responses`).textContent = responses;
      })
      .catch((error) => {
        console.error("Error en la petición:", error);
        screenFetchingResults.style.display = "none";
        screenError.style.display = "block";
        window.scrollTo(0, 0);
        // TODO: Manejar el error adecuadamente
      });
  });

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
  const message = `Hola, he realizado el test (respuestas: ${responses}) y estoy interesada en obtener más información`;
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

// Startup
screenStart.style.display = "block";
initializeSortable("sortable1");
initializeSortable("sortable2");
