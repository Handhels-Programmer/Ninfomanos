const mediaFiles = [
  { name: '2021-05-08 002', type: 'foto', src: 'https://res.cloudinary.com/dkawifwra/image/upload/v1739376253/Alexandra/2021-05-08-002-h.jpg', artist: 'Alexandra' },
 // { name: '2024-02-27 001', type: 'foto', src: 'https://res.cloudinary.com/dkawifwra/image/upload/v1739986154/Amalfi/2024-02-27%20001.jpg', artist: 'Amalfi' },
  { name: '2020-01-10 001', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739376188/Alexandra/2020-01-10-001-h.mp4', artist: 'Alexandra' },
 // { name: '2024-04-23 001', type: 'foto', src: 'https://res.cloudinary.com/dkawifwra/image/upload/v1739986555/Amalfi/2024-04-23%20001.jpg', artist: 'Amalfi' },
 // { name: '2024-04-04 001', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739986302/Amalfi/2024-04-04%20001.mp4', artist: 'Amalfi' },
 // { name: '2024-04-17 001', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739986408/Amalfi/2024-04-17%20001.mp4', artist: 'Amalfi' }
];

// { name: 'Nombre', type: 'foto', src: 'Link', artist: 'Actor' },
 // { name: 'Nombre', type: 'video', src: 'Link', artist: 'Actor' },

const gallery = document.getElementById("gallery");
const videoElement = document.getElementById("fullscreenVideo");
const playPauseBtn = document.getElementById("playPause");
const seekBar = document.getElementById("seekBar");
const muteToggle = document.getElementById("muteToggle");
const artistFilter = document.getElementById("artistFilter");

const uniqueArtists = [...new Set(mediaFiles.map(media => media.artist))];
uniqueArtists.forEach(artist => {
    const option = document.createElement("option");
    option.value = artist;
    option.textContent = artist;
    artistFilter.appendChild(option);
});

artistFilter.addEventListener("change", renderGallery);

function renderGallery() {
  gallery.innerHTML = "";
  const selectedArtist = artistFilter.value;
  mediaFiles.filter(media => selectedArtist === "all" || media.artist === selectedArtist)
      .forEach(media => {
          const item = document.createElement("div");
          item.classList.add("item");
          if (media.type === "foto") {
              const img = document.createElement("img");
              img.src = media.src;
              item.appendChild(img);
              img.addEventListener("click", () => openFullscreenImg(media.src));
          } else if (media.type === "video") {
              const video = document.createElement("video");
              video.src = media.src;
              item.appendChild(video);
              video.addEventListener("click", () => openFullscreenVideo(media.src));
          }
          gallery.appendChild(item);
      });
}

function openFullscreenImg(src) {
  document.getElementById("fullscreenImg").src = src;
  document.getElementById("fullscreenImg").style.display = "block";
  document.getElementById("videoContainer").style.display = "none";
  document.getElementById("fullscreen").style.display = "flex";
}

function openFullscreenVideo(src) {
  videoElement.src = src;
  videoElement.style.display = "block";
  document.getElementById("fullscreenImg").style.display = "none";
  document.getElementById("videoContainer").style.display = "block";
  document.getElementById("fullscreen").style.display = "flex";
}

playPauseBtn.addEventListener("click", () => {
  if (videoElement.paused) {
      videoElement.play();
      playPauseBtn.textContent = "❚❚";
  } else {
      videoElement.pause();
      playPauseBtn.textContent = "▶";
  }
});

videoElement.addEventListener("timeupdate", () => {
  seekBar.value = (videoElement.currentTime / videoElement.duration) * 100;
});

seekBar.addEventListener("input", () => {
  videoElement.currentTime = (seekBar.value / 100) * videoElement.duration;
});

muteToggle.addEventListener("click", () => {
  videoElement.muted = !videoElement.muted;
  muteToggle.textContent = videoElement.muted ? "🔇" : "🔊";
});

document.getElementById("closeFullscreenImg").addEventListener("click", () => {
  document.getElementById("fullscreen").style.display = "none";
});

document.getElementById("closeFullscreen").addEventListener("click", () => {
  document.getElementById("fullscreen").style.display = "none";
  videoElement.pause();
});

renderGallery();


function renderGallery() {
  gallery.innerHTML = "";
  const selectedArtist = artistFilter.value;

  // Ordenar por nombre antes de renderizar
  mediaFiles.sort((a, b) => a.name.localeCompare(b.name));

  mediaFiles
    .filter(media => selectedArtist === "all" || media.artist === selectedArtist)
    .forEach(media => {
      const item = document.createElement("div");
      item.classList.add("item");
      if (media.type === "foto") {
        const img = document.createElement("img");
        img.src = media.src;
        item.appendChild(img);
        img.addEventListener("click", () => openFullscreenImg(media.src));
      } else if (media.type === "video") {
        const video = document.createElement("video");
        video.src = media.src;
        item.appendChild(video);
        video.addEventListener("click", () => openFullscreenVideo(media.src));
      }
      gallery.appendChild(item);
    });
}
