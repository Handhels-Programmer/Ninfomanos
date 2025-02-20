
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
  


  