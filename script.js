// ─── MATRIX EFFECT ───────────────────────────────────────────────────────────
const cv = document.getElementById('mc');
const cx = cv.getContext('2d');
const chars = "01SISR";
let drops = [];
const fs = 15;

function resize() {
  cv.width = innerWidth;
  cv.height = innerHeight;
  drops = Array(Math.floor(cv.width / fs)).fill(1);
}
window.addEventListener('resize', resize);
resize();

function drawMatrix() {
  const light = document.body.classList.contains('light');
  cx.fillStyle = light ? 'rgba(250,248,255,0.15)' : 'rgba(6,3,15,0.15)';
  cx.fillRect(0, 0, cv.width, cv.height);
  cx.fillStyle = light ? 'rgba(124,58,237,0.20)' : 'rgba(168,85,247,0.45)';
  cx.font = fs + 'px "Space Mono"';
  drops.forEach((y, i) => {
    cx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, y * fs);
    if (y * fs > cv.height && Math.random() > .975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 70);

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────
const tb = document.getElementById('theme-btn');
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');

function setTheme(isLight) {
  document.body.classList.toggle('light', isLight);
  sun.style.display = isLight ? 'none' : 'block';
  moon.style.display = isLight ? 'block' : 'none';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

tb.addEventListener('click', () => setTheme(!document.body.classList.contains('light')));

if (localStorage.getItem('theme') === 'light') setTheme(true);

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ─── SKILL BARS ANIMATION ─────────────────────────────────────────────────────
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill').forEach(b => {
        const w = b.dataset.w || .5;
        b.style.width = (parseFloat(w) * 100) + '%';
        b.classList.add('animated');
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.sk-card').forEach(c => barObs.observe(c));

// ─── PROJECT FILTER ───────────────────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.proj-card').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.cat === filter) ? 'block' : 'none';
    });
  });
});
