const mediaFiles = [
  //Alexandra
  //<src=https://files.fm/thumb_video_picture.php?i=naadnga6ht" id="filesfm_embed_js__naadnga6ht"></script>
  { name: '2022-06-11 001', type: 'foto', src: 'https://files.fm/thumb_show.php?i=v6d5qc8ex7', artist: 'Alexandra' },
  { name: '2022-05-17 003', type: 'video', src: 'https://es.files.fm/pa/ninfomanosh/Alexandra/2022-05-17+003.mp4', artist: 'Alexandra' },

  //Amalfis
 // { name: '2024-02-27 001', type: 'foto', src: 'https://res.cloudinary.com/dkawifwra/image/upload/v1739986154/Amalfi/2024-02-27%20001.jpg', artist: 'Amalfis' },
 // { name: '2024-04-23 001', type: 'foto', src: 'https://res.cloudinary.com/dkawifwra/image/upload/v1739986555/Amalfi/2024-04-23%20001.jpg', artist: 'Amalfis' },
 // { name: '2024-04-04 001', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739986302/Amalfi/2024-04-04%20001.mp4', artist: 'Amalfis' },
 // { name: '2024-04-17 001', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739986408/Amalfi/2024-04-17%20001.mp4', artist: 'Amalfis' },

 //Anyeli
 { name: '2024-05-05 001', type: 'foto', src: 'https://res.cloudinary.com/dkawifwra/image/upload/v1739987686/Anyeli/2024-05-05%20001-h.jpg', artist: 'Anyeli' },
 { name: '2023-08-09 001', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739988918/Anyeli/2023-08-09%20001-h.mp4', artist: 'Anyeli' },
 { name: '2022-09-12 001', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739989030/Anyeli/2022-09-12%20001-h.mp4', artist: 'Anyeli' },
 { name: '2021-08-15 001', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739989124/Anyeli/2021-08-15%20001-h.mp4', artist: 'Anyeli' },
 { name: '2020-10-21 001', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739989368/Anyeli/2020-10-21%20001-h.mp4', artist: 'Anyeli' },

 //Anyi
 { name: '2024-07-03 001', type: 'foto', src: 'https://res.cloudinary.com/dkawifwra/image/upload/v1739990117/Anyi/2024-07-03%20001-h.jpg', artist: 'Anyi' },
 { name: '2024-07-03 002', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739989598/Anyi/2024-07-03%20002-h.mp4', artist: 'Anyi' },
 { name: '2024-04-16 001', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739990504/Anyi/2024-04-16%20001-h.mp4', artist: 'Anyi' },

 //Ashley
 { name: '2024-01-01 001', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739991861/Ashley/2024-01-01%20001-h.mp4', artist: 'Ashley' },

 //Berenice
 { name: '2023-11-18 001', type: 'video', src: 'https://res.cloudinary.com/dkawifwra/video/upload/v1739992565/Berenice/2023-11-18%20001-h.mp4', artist: 'Berenice' },

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

//renderGallery();


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
