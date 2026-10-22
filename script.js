
const songs = [
  {
    title: "Summer Dreams",
    artist: "Audio Library",
    category: "Pop",
    icon: "☀️",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Midnight Journey",
    artist: "Sound Helix",
    category: "Chill",
    icon: "🌙",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Ocean Breeze",
    artist: "Sound Helix",
    category: "Chill",
    icon: "🌊",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    title: "Electric Pulse",
    artist: "Sound Helix",
    category: "Electronic",
    icon: "⚡",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    title: "Golden Hour",
    artist: "Sound Helix",
    category: "Pop",
    icon: "🌅",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    title: "Blue Horizon",
    artist: "Sound Helix",
    category: "Electronic",
    icon: "💎",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const search = document.getElementById("search");
const grid = document.getElementById("musicGrid");
const playlist = document.getElementById("playlist");

let currentIndex = 0;
let activeCategory = "All";
let query = "";
let playlistIndexes = songs.map((_, index) => index);

audio.volume = 0.7;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function renderSongs() {
  const filtered = songs.map((song, index) => ({ ...song, index }))
    .filter(song => {
      const matchesCategory =
        activeCategory === "All" || song.category === activeCategory;
      const matchesSearch =
        `${song.title} ${song.artist} ${song.category}`
          .toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });

  document.getElementById("songCount").textContent =
    `${filtered.length} tracks`;

  grid.innerHTML = "";

  if (!filtered.length) {
    grid.innerHTML = "<p>No songs found. Try another search.</p>";
    return;
  }

  filtered.forEach(song => {
    const card = document.createElement("article");
    card.className = "song-card" +
      (song.index === currentIndex ? " selected" : "");

    const cover = document.createElement("div");
    cover.className = `cover cover-${song.index}`;
    cover.textContent = song.icon;

    const title = document.createElement("h3");
    title.textContent = song.title;

    const artist = document.createElement("p");
    artist.textContent = song.artist;

    const category = document.createElement("span");
    category.className = "category";
    category.textContent = song.category;

    card.append(cover, title, artist, category);
    card.addEventListener("click", () => playSong(song.index));
    grid.appendChild(card);
  });
}

function renderPlaylist() {
  playlist.innerHTML = "";

  playlistIndexes.forEach((songIndex, position) => {
    const song = songs[songIndex];
    const row = document.createElement("div");
    row.className = "playlist-row";

    const number = document.createElement("span");
    number.className = "number";
    number.textContent = String(position + 1).padStart(2, "0");

    const details = document.createElement("div");
    details.className = "details";

    const title = document.createElement("strong");
    title.textContent = song.title;

    const artist = document.createElement("p");
    artist.textContent = `${song.artist} · ${song.category}`;

    details.append(title, artist);
    details.addEventListener("click", () => playSong(songIndex));

    const play = document.createElement("button");
    play.textContent = songIndex === currentIndex &&
      !audio.paused ? "Ⅱ" : "▶";
    play.setAttribute("aria-label", `Play ${song.title}`);
    play.addEventListener("click", () => playSong(songIndex));

    row.append(number, details, play);
    playlist.appendChild(row);
  });
}

function updatePlayer() {
  const song = songs[currentIndex];

  document.getElementById("currentTitle").textContent = song.title;
  document.getElementById("currentArtist").textContent = song.artist;
  document.getElementById("sideSong").textContent = song.title;
  document.getElementById("miniCover").textContent = song.icon;
  document.getElementById("elapsed").textContent = formatTime(audio.currentTime);
  document.getElementById("duration").textContent = formatTime(audio.duration);

  const percent = Number.isFinite(audio.duration) && audio.duration > 0
    ? (audio.currentTime / audio.duration) * 100
    : 0;

  document.getElementById("progress").value = percent;
  playBtn.textContent = audio.paused ? "▶" : "Ⅱ";
}

async function playSong(index) {
  currentIndex = index;
  const song = songs[currentIndex];

  if (audio.src !== new URL(song.url, location.href).href) {
    audio.src = song.url;
  }

  updatePlayer();
  renderSongs();
  renderPlaylist();

  try {
    await audio.play();
  } catch (error) {
    console.error("Playback could not start:", error);
    playBtn.textContent = "▶";
  }

  updatePlayer();
  renderPlaylist();
}

function togglePlay() {
  if (!audio.src) {
    playSong(currentIndex);
  } else if (audio.paused) {
    audio.play().then(updatePlayer).catch(error => {
      console.error("Playback failed:", error);
    });
  } else {
    audio.pause();
  }
}

function nextSong() {
  const position = playlistIndexes.indexOf(currentIndex);
  const nextPosition = position < 0
    ? 0
    : (position + 1) % playlistIndexes.length;

  playSong(playlistIndexes[nextPosition]);
}

function previousSong() {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }

  const position = playlistIndexes.indexOf(currentIndex);
  const previousPosition = position < 0
    ? 0
    : (position - 1 + playlistIndexes.length) % playlistIndexes.length;

  playSong(playlistIndexes[previousPosition]);
}

search.addEventListener("input", event => {
  query = event.target.value;
  renderSongs();
});

document.querySelectorAll(".nav").forEach(button => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.filter;

    document.querySelectorAll(".nav").forEach(item =>
      item.classList.toggle("active", item === button)
    );

    renderSongs();
  });
});

playBtn.addEventListener("click", togglePlay);
document.getElementById("heroPlay").addEventListener("click", togglePlay);
document.getElementById("next").addEventListener("click", nextSong);
document.getElementById("prev").addEventListener("click", previousSong);

document.getElementById("volume").addEventListener("input", event => {
  audio.volume = Number(event.target.value);
});

document.getElementById("progress").addEventListener("input", event => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (Number(event.target.value) / 100) * audio.duration;
  }
});

audio.addEventListener("timeupdate", updatePlayer);
audio.addEventListener("loadedmetadata", updatePlayer);
audio.addEventListener("play", () => {
  updatePlayer();
  renderPlaylist();
});
audio.addEventListener("pause", () => {
  updatePlayer();
  renderPlaylist();
});
audio.addEventListener("ended", nextSong);
audio.addEventListener("error", () => {
  document.getElementById("currentArtist").textContent =
    "Audio unavailable. Try another track.";
});

renderSongs();
renderPlaylist();
updatePlayer();
