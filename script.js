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
        fullscreenDiv.classList.add('fullscreen');

        if (mediaElement.tagName === 'VIDEO') {
            const playerControls = document.createElement('div');
            playerControls.classList.add('player-controls');

            const playPauseButton = document.createElement('button');
            playPauseButton.textContent = '▶️';

            const volumeSlider = document.createElement('input');
            volumeSlider.type = 'range';
            volumeSlider.min = 0;
            volumeSlider.max = 1;
            volumeSlider.step = 0.1;
            volumeSlider.value = mediaElement.volume;

            const closeButton = document.createElement('button');
            closeButton.textContent = '❌';

            playerControls.appendChild(playPauseButton);
            playerControls.appendChild(volumeSlider);
            playerControls.appendChild(closeButton);

            fullscreenDiv.appendChild(mediaElement);
            fullscreenDiv.appendChild(playerControls);
            document.body.appendChild(fullscreenDiv);

            playPauseButton.addEventListener('click', () => {
                if (mediaElement.paused) {
                    mediaElement.play();
                    playPauseButton.textContent = '⏸️';
                } else {
                    mediaElement.pause();
                    playPauseButton.textContent = '▶️';
                }
            });

            volumeSlider.addEventListener('input', (e) => {
                mediaElement.volume = e.target.value;
            });

            closeButton.addEventListener('click', () => {
                document.body.removeChild(fullscreenDiv);
            });
        } else {
            fullscreenDiv.appendChild(mediaElement);
            document.body.appendChild(fullscreenDiv);
            fullscreenDiv.addEventListener('click', () => {
                document.body.removeChild(fullscreenDiv);
            });
        }
    });
});