const screenStart = document.getElementById('screenStart');
const screenPart1 = document.getElementById('screenPart1');
const screenPart1Review = document.getElementById('screenPart1Review');
const screenPart2 = document.getElementById('screenPart2');
const screenPart2Review = document.getElementById('screenPart2Review');
const screenFetchingResults = document.getElementById('screenFetchingResults');
const screenResult = document.getElementById('screenResult');

// Screen Start
document.getElementById('btnScreenStartContinueToPart1').addEventListener('click', () => {
    screenStart.style.display = 'none';
    screenPart1.style.display = 'block';
});

// Screen Part 1
document.getElementById('btnScreenPart1ContinueToReview').addEventListener('click', () => {

    // Obtener los elementos de la lista anterior
    const items = document.querySelectorAll('#sortable1 li');
    const orderedListPart1 = document.getElementById('orderedListPart1');
    orderedListPart1.innerHTML = ''; // Limpiar la lista numerada

    // Añadir los elementos a la lista numerada
    items.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.style.textAlign = 'left';
        listItem.textContent = `${item.textContent}`;
        orderedListPart1.appendChild(listItem);
    });

    screenPart1.style.display = 'none';
    screenPart1Review.style.display = 'block';
});

// Screen Part 1 Review
document.getElementById('btnScreenPart1ReviewBack').addEventListener('click', () => {
    screenPart1Review.style.display = 'none';
    screenPart1.style.display = 'block';
});
document.getElementById('btnScreenPart1ReviewNext').addEventListener('click', () => {
    screenPart1Review.style.display = 'none';
    screenPart2.style.display = 'block';
});

// Screen Part 2
document.getElementById('btnScreenPart2Back').addEventListener('click', () => {
    screenPart2.style.display = 'none';
    screenPart1.style.display = 'block';
});

document.getElementById('btnScreenPart2Next').addEventListener('click', () => {

    const items = document.querySelectorAll('#sortable2 li');
    const orderedListPart2 = document.getElementById('orderedListPart2');
    orderedListPart2.innerHTML = ''; // Limpiar la lista numerada

    items.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.style.textAlign = 'left';
        listItem.textContent = `${item.textContent}`;
        orderedListPart2.appendChild(listItem);
    });

    screenPart2.style.display = 'none';
    screenPart2Review.style.display = 'block';
});

// Screen Part 2 Review
document.getElementById('btnScreenPart2ReviewBack').addEventListener('click', () => {
    screenPart2Review.style.display = 'none';
    screenPart2.style.display = 'block';
});
document.getElementById('btnScreenPart2ReviewNext').addEventListener("click", () => {

    screenPart2.style.display = 'none';
    screenFetchingResults.style.display = 'block';

    const itemsScreen2 = document.querySelectorAll('#sortable1 li');
    const idsScreen2 = Array.from(itemsScreen2).map(item => item.id);
    
    const itemsScreen3 = document.querySelectorAll('#sortable2 li');
    const idsScreen3 = Array.from(itemsScreen3).map(item => item.id);

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
        // Procesar y mostrar los resultados en la pantalla de resultados
        document.getElementById(`me_dimi`).textContent = data[0];
        document.getElementById(`me_dime`).textContent = data[1];
        document.getElementById(`me_dims`).textContent = data[2];
        document.getElementById(`mi_dimi`).textContent = data[3];
        document.getElementById(`mi_dime`).textContent = data[4];
        document.getElementById(`mi_dims`).textContent = data[5];
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

// Startup
screenStart.style.display = 'block';
initializeSortable('sortable1');
initializeSortable('sortable2');