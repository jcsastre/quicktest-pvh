// Variables para los elementos de las pantallas
const screen1 = document.getElementById('screen1');
const screen2 = document.getElementById('screen2');
const screen3 = document.getElementById('screen3');

// Botones de navegación
const continueBtn1 = document.getElementById('continueBtn1');
const continueBtn2 = document.getElementById('continueBtn2');
const backBtn = document.getElementById('backBtn');
const resultsBtn = document.getElementById('resultsBtn');

// Inicialización de la pantalla 1
screen1.style.display = 'block';

// Manejo de eventos para los botones
continueBtn1.addEventListener('click', () => {
    screen1.style.display = 'none';
    screen2.style.display = 'block';
});

continueBtn2.addEventListener('click', () => {
    screen2.style.display = 'none';
    screen3.style.display = 'block';
});

backBtn.addEventListener('click', () => {
    screen3.style.display = 'none';
    screen2.style.display = 'block';
});

// Drag and drop para listas
function enableDragAndDrop(listId) {
    const list = document.getElementById(listId);
    let draggedItem = null;

    list.addEventListener('dragstart', (e) => {
        draggedItem = e.target;
        e.target.style.opacity = 0.5;
    });

    list.addEventListener('dragend', (e) => {
        e.target.style.opacity = "";
    });

    list.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    list.addEventListener('dragenter', (e) => {
        if (e.target.tagName === 'LI' && e.target !== draggedItem) {
            e.target.style.border = '2px dashed #000';
        }
    });

    list.addEventListener('dragleave', (e) => {
        if (e.target.tagName === 'LI' && e.target !== draggedItem) {
            e.target.style.border = '';
        }
    });

    list.addEventListener('drop', (e) => {
        if (e.target.tagName === 'LI' && e.target !== draggedItem) {
            e.target.style.border = '';
            list.insertBefore(draggedItem, e.target.nextSibling || e.target);
        }
    });
}

// Habilitar drag and drop en ambas listas
enableDragAndDrop('sortable1');
enableDragAndDrop('sortable2');

resultsBtn.addEventListener('click', () => {
    // Obtener los elementos de la lista de Screen 2
    const itemsScreen2 = document.querySelectorAll('#sortable1 li');
    const idsScreen2 = Array.from(itemsScreen2).map(item => item.id);
    
    // Obtener los elementos de la lista de Screen 3
    const itemsScreen3 = document.querySelectorAll('#sortable2 li');
    const idsScreen3 = Array.from(itemsScreen3).map(item => item.id);

    // Mostrar los identificadores en la consola
    console.log('Identificadores de los elementos en Screen 2:', idsScreen2);
    console.log('Identificadores de los elementos en Screen 3:', idsScreen3);
});
