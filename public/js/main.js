// Variables para los elementos de las pantallas
const screenStart = document.getElementById('screenStart');
const screenPart1 = document.getElementById('screenPart1');
const screenPart2 = document.getElementById('screenPart2');
const screenFetchingResults = document.getElementById('screenFetchingResults');
const screenResult = document.getElementById('screenResult');

// Botones de navegación
const btnContinueToPart1 = document.getElementById('btnContinueToPart1');
const btnBackToPart1 = document.getElementById('btnBackToPart1');
const btnContinueToPart2 = document.getElementById('btnContinueToPart2');
const btnBackToPart2 = document.getElementById('btnBackToPart2');
const btnSeeResults = document.getElementById('btnSeeResults');

// Inicialización de la pantalla 1
screenStart.style.display = 'block';

// Manejo de eventos para los botones
btnContinueToPart1.addEventListener('click', () => {
    screenStart.style.display = 'none';
    screenPart1.style.display = 'block';
});

btnBackToPart1.addEventListener('click', () => {
    screenPart2.style.display = 'none';
    screenPart1.style.display = 'block';
});

btnContinueToPart2.addEventListener('click', () => {
    screenPart1.style.display = 'none';
    screenPart2.style.display = 'block';
});

btnSeeResults.addEventListener("click", () => {
    screenPart2.style.display = 'none';
    screenFetchingResults.style.display = 'block';

    const itemsScreen2 = document.querySelectorAll('#sortable1 li');
    const idsScreen2 = Array.from(itemsScreen2).map(item => item.id);
    
    const itemsScreen3 = document.querySelectorAll('#sortable2 li');
    const idsScreen3 = Array.from(itemsScreen3).map(item => item.id);

    // TODO: enviar los identificadores a tu backend y esperar el json de respuesta con los resultados

    const responses = [...idsScreen2, ...idsScreen3];
    const payload = { responses };

    // Mostrar los identificadores en la consola
    console.log('responses', responses);
    console.log('payload', payload);

    // Realizar la petición HTTP GET
    fetch('http://localhost:8080/quicktest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(responses)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        screenFetchingResults.style.display = 'none';
        screenResult.style.display = 'block';
        // TODO: Procesar y mostrar los resultados en la pantalla de resultados
    })
    .catch(error => {
        console.error('Error en la petición:', error);
        screenFetchingResults.style.display = 'none';
        screenResult.style.display = 'block';
        // TODO: Manejar el error adecuadamente
    });
});

// Configurar SortableJS para listas
function initializeSortable(listId) {
    const list = document.getElementById(listId);
    
    // Inicializa SortableJS en la lista
    new Sortable(list, {
        animation: 150,
        ghostClass: 'sortable-ghost',  // Clase aplicada al elemento que se está arrastrando
        onEnd: function (evt) {
            // Opcional: Código a ejecutar después de que el elemento se haya soltado
            console.log(`Elemento movido de ${evt.oldIndex} a ${evt.newIndex}`);
        }
    });
}

// Habilitar drag and drop en ambas listas
initializeSortable('sortable1');
initializeSortable('sortable2');


