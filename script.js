const filterButtons = document.querySelectorAll('.filters button');
const searchInput = document.getElementById('search-input');
const gallery = document.querySelector('.gallery');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

// Función para ordenar los elementos por nombre de archivo
function sortGalleryItems(items) {
    return items.sort((a, b) => {
        const nameA = a.querySelector('img, video').getAttribute('src').toLowerCase();
        const nameB = b.querySelector('img, video').getAttribute('src').toLowerCase();
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
        const mediaElement = item.querySelector('img, video');
        const fileName = mediaElement.getAttribute('src').toLowerCase();

        if (fileName.includes(query)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
});