const filterButtons = document.querySelectorAll('.filters button');
const searchInput = document.getElementById('search-input');
const gallery = document.querySelector('.gallery');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

// Función para ordenar los elementos por nombre de archivo
function sortGalleryItems(items) {
    return items.sort((a, b) => {
        const nameA = a.getAttribute('data-name').toLowerCase();
        const nameB = b.getAttribute('data-name').toLowerCase();
        return nameA.localeCompare(nameB);
    });
}

// Reorganizar los elementos al cargar la página
const sortedItems = sortGalleryItems(galleryItems);
gallery.innerHTML = '';
sortedItems.forEach(item => gallery.appendChild(item));

// Filtrar elementos por carpeta
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const folder = button.getAttribute('data-folder');

        sortedItems.forEach(item => {
            if (folder === 'all' || item.getAttribute('data-folder') === folder) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Buscar elementos por nombre
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    sortedItems.forEach(item => {
        const name = item.getAttribute('data-name').toLowerCase();

        if (name.includes(query)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
});

// Hacer que los elementos se muestren en pantalla completa al hacer clic
sortedItems.forEach(item => {
    item.addEventListener('click', () => {
        const mediaElement = item.querySelector('img, video').cloneNode(true);
        const fullscreenDiv = document.createElement('div');
        const rotationControls = document.createElement('div');

        fullscreenDiv.classList.add('fullscreen');
        rotationControls.classList.add('rotation-controls');

        const rotateLeftButton = document.createElement('button');
        rotateLeftButton.textContent = '⟲';
        const rotateRightButton = document.createElement('button');
        rotateRightButton.textContent = '⟳';

        rotationControls.appendChild(rotateLeftButton);
        rotationControls.appendChild(rotateRightButton);

        fullscreenDiv.appendChild(mediaElement);
        fullscreenDiv.appendChild(rotationControls);
        document.body.appendChild(fullscreenDiv);

        let rotation = 0;

        rotateLeftButton.addEventListener('click', () => {
            rotation -= 90;
            mediaElement.style.transform = `rotate(${rotation}deg)`;
        });

        rotateRightButton.addEventListener('click', () => {
            rotation += 90;
            mediaElement.style.transform = `rotate(${rotation}deg)`;
        });

        // Cerrar el modo de pantalla completa al hacer clic fuera del video/imagen
        fullscreenDiv.addEventListener('click', (e) => {
            if (e.target === fullscreenDiv) {
                document.body.removeChild(fullscreenDiv);
            }
        });
    });
});