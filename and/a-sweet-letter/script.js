/* ── screen navigation ─────────────────────────────── */
const screens = document.querySelectorAll(".screen");

function goTo(n) {
  screens.forEach((s) => s.classList.remove("active"));
  const next = document.getElementById(`screen-${n}`);
  next.classList.add("active");
  next.scrollTop = 0;
  if (n !== 2 && !song.paused) pauseSong();
}

document.querySelectorAll("[data-goto]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    goTo(Number(btn.dataset.goto));
  });
});

document.getElementById("screen-1").addEventListener("click", () => goTo(2));

/* ── music player ──────────────────────────────────── */
const song = document.getElementById("song");
const playBtn = document.getElementById("play-btn");
const playerBar = document.getElementById("player-bar");
const playerFill = document.getElementById("player-fill");
const timeNow = document.getElementById("time-now");
const timeTotal = document.getElementById("time-total");

const fmt = (s) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

song.addEventListener("loadedmetadata", () => {
  timeTotal.textContent = fmt(song.duration);
});

song.addEventListener("timeupdate", () => {
  timeNow.textContent = fmt(song.currentTime);
  playerFill.style.width = song.duration
    ? `${(song.currentTime / song.duration) * 100}%`
    : "0%";
});

song.addEventListener("ended", () => {
  playBtn.classList.remove("playing");
  song.currentTime = 0;
});

function pauseSong() {
  song.pause();
  playBtn.classList.remove("playing");
}

playBtn.addEventListener("click", () => {
  if (song.paused) {
    song.play();
    playBtn.classList.add("playing");
  } else {
    pauseSong();
  }
});

playerBar.addEventListener("click", (e) => {
  if (!song.duration) return;
  const rect = playerBar.getBoundingClientRect();
  song.currentTime = ((e.clientX - rect.left) / rect.width) * song.duration;
});

/* ── album carousel ────────────────────────────────── */
const slides = [
  { src: "assets/page3-img1.jpeg", caption: "a lily for the prettiest girl I know. happy birthday, my love." },
  { src: "assets/page3-gif2.gif", caption: "this is us. you, me, and a hug that never quite ends." },
  { src: "assets/page3-img3.jpeg", caption: "I'd hand you a rose every single day if you let me." },
];
let current = 0;

const slideImg = document.getElementById("slide-img");
const slideImgBox = document.getElementById("slide-img-box");
const slideCount = document.getElementById("slide-count");
const slideCaption = document.getElementById("slide-caption");
const thumbs = document.querySelectorAll(".thumb");

function showSlide(i) {
  current = (i + slides.length) % slides.length;
  slideImg.src = slides[current].src;
  slideCaption.textContent = slides[current].caption;
  slideCount.textContent = `0${current + 1} / 0${slides.length}`;
  thumbs.forEach((t, k) => t.classList.toggle("active", k === current));
  slideImgBox.classList.remove("switching");
  void slideImgBox.offsetWidth; // restart the swap animation
  slideImgBox.classList.add("switching");
}

document.getElementById("prev-btn").addEventListener("click", () => showSlide(current - 1));
document.getElementById("next-btn").addEventListener("click", () => showSlide(current + 1));
thumbs.forEach((t) => t.addEventListener("click", () => showSlide(Number(t.dataset.slide))));

/* ── ambient floating decorations ──────────────────── */
const ambient = document.getElementById("ambient");
const glyphs = ["♥", "❀", "✿", "✦", "♡", "❋"];
const tints = ["#d9c6f4", "#f4c6d6", "#e6d4f6", "#f6dbc9", "#cdbaf3"];

for (let i = 0; i < 16; i++) {
  const el = document.createElement("span");
  el.textContent = glyphs[i % glyphs.length];
  el.style.left = `${Math.random() * 96}%`;
  el.style.top = `${Math.random() * 94}%`;
  el.style.fontSize = `${9 + Math.random() * 13}px`;
  el.style.color = tints[i % tints.length];
  el.style.opacity = 0.35 + Math.random() * 0.4;
  el.style.animationDelay = `${-Math.random() * 9}s`;
  el.style.animationDuration = `${7 + Math.random() * 6}s`;
  ambient.appendChild(el);
}

/* ── testing helpers (must stay last: goTo touches `song`) ── */
// deep-link straight to a screen, e.g. index.html#3
const hash = Number(location.hash.slice(1));
if (hash >= 1 && hash <= 5) goTo(hash);

// ?still freezes all animation (handy for screenshots/testing)
if (new URLSearchParams(location.search).has("still")) {
  const st = document.createElement("style");
  st.textContent =
    "*{animation:none!important;transition:none!important}" +
    ".pop-in,.rise-in{opacity:1!important}";
  document.head.appendChild(st);
}
