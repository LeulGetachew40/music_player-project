const title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img");

const music = new Audio();

// const songs = [
//   {
//     path: "../assets/1.mp3",
//     displayName: "The Charmer's Call",
//     cover: "assets/1.jpg",
//     artist: "Hanu Dixit",
//   },
//   {
//     path: "../assets/2.mp3",
//     displayName: "You Will Never See Me Coming",
//     cover: "assets/2.jpg",
//     artist: "NEFFEX",
//   },
//   {
//     path: "../assets/3.mp3",
//     displayName: "Intellect",
//     cover: "assets/3.jpg",
//     artist: "Yung Logos",
//   },
// ];

async function getAllUsersSongs() {
  const response = await fetch(`${window.location.href}/songs`);
  const data = await response.json();
  return data.songs;
}

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  isPlaying = true;
  // Change play button icon
  playBtn.classList.replace("fa-play", "fa-pause");
  // Set button hover title
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  // Change pause button icon
  playBtn.classList.replace("fa-pause", "fa-play");
  // Set button hover title
  playBtn.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.address;
  console.log(song.address);
  title.textContent = song.title;
  artist.textContent = song.artist;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

let songs;
getAllUsersSongs()
  .then((data) => {
    songs = data;
    const tbody = document.querySelector("#music__list");
    songs.forEach((song, index) => {
      const tr = `<tr class="music__interest__body"><td class="music__interest__body">${
        index + 1
      }</td><td class="music__interest__body">${
        song.title
      }</td><td class="music__interest__body">${new Date(
        song.datePublished
      ).toLocaleDateString(
        "en-US"
      )}</td><td class="music__interest__body"><button>Add</button><button>Remove
      </button></td></tr>`;
      tbody.innerHTML += tr;
    });
    loadMusic(songs[musicIndex]);
  })
  .catch((err) => {
    console.log(err);
  });
