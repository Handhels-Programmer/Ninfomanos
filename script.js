const mediaFiles = [
  { name: '2021-05-08 002', type: 'foto', src: 'https://res.cloudinary.com/dkawifwra/image/upload/v1739376253/Alexandra/2021-05-08-002-h.jpg', artist: 'Alexandra' },
  { name: '2023', type: 'foto', src: 'imagen2.jpg', artist: 'Artista B' },
  { name: '2020-01-10 001', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739376188/Alexandra/2020-01-10-001-h.mp4', artist: 'Alexandra' },
  { name: '2024', type: 'foto', src: 'imagen3.jpg', artist: 'Artista C' },
  { name: '2025', type: 'video', src: 'video2.mp4', artist: 'Artista B' }
];

const gallery = document.getElementById("gallery");
const videoElement = document.getElementById("fullscreenVideo");
const playPauseBtn = document.getElementById("playPause");
const seekBar = document.getElementById("seekBar");
const muteToggle = document.getElementById("muteToggle");

function renderGallery() {
  gallery.innerHTML = "";
  mediaFiles.forEach(media => {
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