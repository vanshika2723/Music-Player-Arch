# 🎵 Melody Music Player

A responsive, web-based music player built using **HTML, CSS, and JavaScript** as part of Task 3 of the Web Development Internship.

## 🌐 Live Demo

**Live Website:** https://vanshika2723.github.io/Music-Player-Arch/

**GitHub Repository:** https://github.com/vanshika2723/Music-Player-Arch

## 📌 Project Overview

Melody Music Player is a browser-based music application that provides a simple and attractive interface for discovering and playing music. Users can browse tracks, search for songs, filter music by category, and control playback through an interactive music player.

## ✨ Features

- ▶️ Play and pause music.
- ⏮️ Previous and next track controls.
- 🔊 Adjustable volume control.
- 🔎 Search songs by title, artist, or category.
- 🎶 Playlist displaying available tracks.
- 🗂️ Music categories including Pop, Chill, and Electronic.
- ⏱️ Playback progress bar and song duration.
- 📱 Responsive layout for desktop and mobile devices.
- 🎨 Modern dark-themed interface with orange and purple accents.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure and audio player element |
| CSS3 | Styling, layout, and responsive design |
| JavaScript | Playback controls, search, filtering, and playlist functionality |
| HTML Audio API | Loading and controlling audio tracks |
| Git & GitHub | Version control and source code hosting |
| GitHub Pages | Hosting the live website |

## 📂 Project Structure

```text
Music-Player-Arch/
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ Implementation Details

### 1. HTML — `index.html`

HTML defines the application layout, including the sidebar, music discovery section, search input, playlist, audio controls, progress bar, and volume slider.

### 2. CSS — `style.css`

CSS provides the dark-themed interface, music cards, navigation styling, player layout, hover effects, and responsive media queries for different screen sizes.

### 3. JavaScript — `script.js`

JavaScript manages the music collection and implements the main interactive features:

- Displays music cards and playlist entries dynamically.
- Filters tracks according to the selected category.
- Searches by song title, artist, or category.
- Controls play, pause, next, and previous playback.
- Updates the current song details and progress bar.
- Adjusts volume using the range input.
- Automatically plays the next track when the current track ends.

## 💻 Code Highlights

### Audio Playback

```javascript
async function playSong(index) {
  currentIndex = index;
  const song = songs[currentIndex];

  if (audio.src !== new URL(song.url, location.href).href) {
    audio.src = song.url;
  }

  await audio.play();
  updatePlayer();
  renderPlaylist();
}
```

This function selects a track, loads its audio source, starts playback, and refreshes the player interface.

### Search Functionality

```javascript
const matchesSearch =
  `${song.title} ${song.artist} ${song.category}`
    .toLowerCase()
    .includes(query.toLowerCase());
```

This logic enables case-insensitive searching across song titles, artists, and music categories.

### Volume Control

```javascript
document.getElementById("volume")
  .addEventListener("input", event => {
    audio.volume = Number(event.target.value);
  });
```

The volume slider updates the audio element's volume interactively.

## 🧪 Testing Checklist

- [ ] Music cards display correctly.
- [ ] Play and pause controls work.
- [ ] Previous and next track controls work.
- [ ] Search returns matching tracks.
- [ ] Category filters display the appropriate songs.
- [ ] Playlist entries select the correct track.
- [ ] Volume and playback progress controls work.
- [ ] Layout adapts to mobile and desktop screens.
- [ ] Live website loads correctly.

## 🚀 How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/vanshika2723/Music-Player-Arch.git
   ```

2. Open the project folder in Visual Studio Code.
3. Open `index.html` using the Live Server extension.
4. Ensure you have an internet connection for the sample audio URLs.

## 🎯 Learning Outcomes

Through this project, I practised:

- Building responsive web interfaces.
- Manipulating HTML elements using JavaScript.
- Working with browser audio playback controls.
- Implementing search and category filtering.
- Managing interactive UI updates and event listeners.
- Hosting a static website using GitHub Pages.

## 👩‍💻 Developer

**Name:** Vanshika Khandelwal  
**Internship Domain:** Web Development  
**Project:** Task 3 — Music Player  
**Organization:** Arch Technologies

## 🔮 Future Improvements

- Add custom playlists and the ability to remove tracks.
- Add shuffle and repeat modes.
- Save user preferences using local storage.
- Integrate a larger music library with properly licensed audio.
- Add song artwork and duration metadata.

## 📄 License

This project was created for educational and internship purposes. Audio tracks are loaded from external sample URLs and remain subject to their respective providers' terms.

---

⭐ If you find this project useful, feel free to explore the repository and try the live demo.
