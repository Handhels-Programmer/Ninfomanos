// Datos de la galería: cada objeto incluye nombre, tipo, fuente y artista
const galleryItems = [
    { name: '2021-05-08 002', type: 'foto', src: 'https://res.cloudinary.com/dkawifwra/image/upload/v1739376253/Alexandra/2021-05-08-002-h.jpg', artist: 'Alexandra' },
    { name: '2023', type: 'foto', src: 'imagen2.jpg', artist: 'Artista B' },
    { name: '2020-01-10 001', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739376188/Alexandra/2020-01-10-001-h.mp4', artist: 'Alexandra' },
    { name: '2024', type: 'foto', src: 'imagen3.jpg', artist: 'Artista C' },
    { name: '2025', type: 'video', src: 'video2.mp4', artist: 'Artista B' }
  ];
  
  // Función para construir la galería dinámicamente
  function buildGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
  
    galleryItems.forEach(item => {
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');
      galleryItem.setAttribute('data-name', item.name);
      galleryItem.setAttribute('data-type', item.type);
      galleryItem.setAttribute('data-artist', item.artist);
  
      // Crear el elemento según su tipo (foto o video)
      if (item.type === 'foto') {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.name;
        galleryItem.appendChild(img);
      } else if (item.type === 'video') {
        const video = document.createElement('video');
        video.setAttribute('controls', '');
        const source = document.createElement('source');
        source.src = item.src;
        source.type = 'video/mp4';
        video.appendChild(source);
        video.innerHTML = 'Tu navegador no soporta videos.';
        galleryItem.appendChild(video);
      }
  
      // Agregar el título del elemento
      const caption = document.createElement('p');
      caption.textContent = item.name;
      galleryItem.appendChild(caption);
  
      gallery.appendChild(galleryItem);
    });
  }
  
  // Función para ordenar la galería por nombre de forma descendente utilizando localeCompare
  function sortGallery() {
    const gallery = document.getElementById('gallery');
    const items = Array.from(gallery.getElementsByClassName('gallery-item'));
  
    items.sort((a, b) => {
      const nameA = a.getAttribute('data-name');
      const nameB = b.getAttribute('data-name');
      // Compara en orden descendente usando localeCompare con configuración en español
      return nameB.localeCompare(nameA, 'es', { sensitivity: 'base' });
    });
  
    // Reinsertamos los elementos ordenados en el contenedor
    items.forEach(item => gallery.appendChild(item));
  }
  
  // Variables para almacenar los filtros actuales
  let currentTypeFilter = 'all';
  let currentArtistFilter = 'all';
  
  // Función para aplicar ambos filtros (tipo y artista)
  function applyFilters() {
    const gallery = document.getElementById('gallery');
    const items = gallery.getElementsByClassName('gallery-item');
  
    Array.from(items).forEach(item => {
      const itemType = item.getAttribute('data-type');
      const itemArtist = item.getAttribute('data-artist');
  
      // Se muestra el elemento solo si cumple con ambos filtros
      if ((currentTypeFilter === 'all' || currentTypeFilter === itemType) &&
          (currentArtistFilter === 'all' || currentArtistFilter === itemArtist)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Construir la galería, ordenarla y aplicar los filtros iniciales
    buildGallery();
    sortGallery();
    applyFilters();
  
    // Filtrado por tipo (foto, video o todos)
    const typeButtons = document.querySelectorAll('.type-filter');
    typeButtons.forEach(button => {
      button.addEventListener('click', function() {
        currentTypeFilter = this.getAttribute('data-filter');
        applyFilters();
      });
    });
  
    // Filtrado por artista (usando un select)
    const artistSelect = document.getElementById('artistSelect');
    artistSelect.addEventListener('change', function() {
      currentArtistFilter = this.value;
      applyFilters();
    });
  });
  


  // Obtener referencias a los elementos del modal
const modal = document.getElementById('mediaModal');
const modalImage = document.getElementById('modalImage');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.querySelector('.close');

// Función para abrir el modal con la imagen o video seleccionado
function openModal(src, type) {
  modal.style.display = 'flex';

  if (type === 'foto') {
    modalImage.src = src;
    modalImage.style.display = 'block';
    modalVideo.style.display = 'none';
  } else if (type === 'video') {
    modalVideo.src = src;
    modalVideo.style.display = 'block';
    modalImage.style.display = 'none';
    modalVideo.play(); // Reproducir automáticamente el video
  }
}

// Cerrar el modal al hacer clic en la "X"
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  modalVideo.pause(); // Pausar el video al cerrar
});

// Cerrar el modal al hacer clic fuera del contenido
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modalVideo.pause();
  }
});

// Modificar la función buildGallery() para que los elementos sean clickeables
function buildGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  galleryItems.forEach(item => {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    galleryItem.setAttribute('data-name', item.name);
    galleryItem.setAttribute('data-type', item.type);
    galleryItem.setAttribute('data-artist', item.artist);

    // Crear el elemento según su tipo (foto o video)
    let mediaElement;
    if (item.type === 'foto') {
      mediaElement = document.createElement('img');
      mediaElement.src = item.src;
      mediaElement.alt = item.name;
    } else if (item.type === 'video') {
      mediaElement = document.createElement('video');
      mediaElement.setAttribute('controls', '');
      const source = document.createElement('source');
      source.src = item.src;
      source.type = 'video/mp4';
      mediaElement.appendChild(source);
    }

    // Agregar evento para abrir el modal al hacer clic
    mediaElement.addEventListener('click', () => openModal(item.src, item.type));

    galleryItem.appendChild(mediaElement);

    // Agregar el título del elemento
    const caption = document.createElement('p');
    caption.textContent = item.name;
    galleryItem.appendChild(caption);

    gallery.appendChild(galleryItem);
  });
}




document.addEventListener('contextmenu', function (event) {
    if (event.target.tagName === 'IMG' || event.target.tagName === 'VIDEO') {
      event.preventDefault();
    }
  });
  

  document.addEventListener('dragstart', function (event) {
    if (event.target.tagName === 'IMG' || event.target.tagName === 'VIDEO') {
      event.preventDefault();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('video').forEach(video => {
      video.setAttribute('controlsList', 'nodownload'); // Oculta el botón de descarga en los controles del video
      video.setAttribute('oncontextmenu', 'return false;'); // Bloquea clic derecho en los videos
    });
  });
  