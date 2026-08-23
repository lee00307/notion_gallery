const params = new URLSearchParams(location.search);
const album = params.get("album");
const gallery = document.querySelector("#gallery");
const statusEl = document.querySelector("#status");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const closeBtn = document.querySelector("#close");
const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif)$/i;

async function loadGallery() {
  if (!album) {
    statusEl.textContent = "URL에 ?album=폴더이름 을 넣어주세요.";
    return;
  }
  if (CONFIG.githubUser === "YOUR_GITHUB_USERNAME") {
    statusEl.textContent = "config.js에서 GitHub 아이디를 먼저 설정해주세요.";
    return;
  }

  document.title = album;
  const api = `https://api.github.com/repos/${encodeURIComponent(CONFIG.githubUser)}/${encodeURIComponent(CONFIG.repo)}/contents/albums/${encodeURIComponent(album)}?ref=${encodeURIComponent(CONFIG.branch)}`;

  try {
    const res = await fetch(api, {headers: {"Accept": "application/vnd.github+json"}});
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

    const items = await res.json();
    const images = items
      .filter(x => x.type === "file" && IMAGE_RE.test(x.name))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, {numeric:true, sensitivity:"base"}));

    if (!images.length) {
      statusEl.textContent = "이 폴더에 이미지가없음 ㄱㅡ";
      return;
    }

    statusEl.hidden = true;
    for (const item of images) {
      const figure = document.createElement("figure");
      figure.className = "tile";
      const img = document.createElement("img");
      img.src = item.download_url;
      img.alt = item.name;
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("click", () => {
        lightboxImage.src = item.download_url;
        lightboxImage.alt = item.name;
        lightbox.showModal();
      });
      figure.appendChild(img);
      gallery.appendChild(figure);
    }
  } catch (err) {
    console.error(err);
    statusEl.textContent = "갤러리를 못불러옴 ㅡㅡ 폴더명/저장소명/config.js를 확인해바.";
  }
}

closeBtn.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", e => { if (e.target === lightbox) lightbox.close(); });
loadGallery();
