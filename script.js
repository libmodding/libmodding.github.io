/* ===== MATRIX EFFECT ===== */
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;

const fontSize = 18;
let cols = Math.floor(w / fontSize);
let drops = Array(cols).fill(1);

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

function matrix() {
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  ctx.fillRect(0, 0, w, h);

  ctx.font = fontSize + "px Silkscreen";
  ctx.fillStyle = Math.random() > 0.5 ? "#ffffff" : "#bbbbbb";

  drops.forEach((y, i) => {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);

    if (y * fontSize > h && Math.random() > 0.98) {
      drops[i] = 0;
    }
    drops[i]++;
  });

  requestAnimationFrame(matrix);
}

matrix();

window.addEventListener("resize", () => {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
  cols = Math.floor(w / fontSize);
  drops = Array(cols).fill(1);
});

/* ===== SEARCH FILTER ===== */
const searchInput = document.getElementById("search-input");
const cards = document.querySelectorAll(".game-card");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const match = title.includes(value);

    if (value === "") {
      card.style.transform = "scale(1)";
      card.style.boxShadow = "0 0 10px #fff, 0 0 20px #aaa";
    } else if (match) {
      card.style.transform = "scale(1.1)";
      card.style.boxShadow = "0 0 35px #fff, 0 0 50px #aaa";
    } else {
      card.style.transform = "scale(1)";
      card.style.boxShadow = "0 0 10px #fff, 0 0 20px #aaa";
    }
  });
});

/* ===== CARD CLICK ===== */
cards.forEach(card => {
  card.addEventListener("click", e => {
    if (!e.target.closest(".card-buttons button")) {
      window.open(card.dataset.urlMain, "_blank");
    }
  });
});

/* ===== ABOUT:BLANK ===== */
function openAboutBlank(btn) {
  const url = btn.closest(".game-card").dataset.urlBlank;

  fetch(url + "?t=" + Date.now())
    .then(r => r.text())
    .then(t => {
      const w = window.open("about:blank", "_blank");
      if (w) {
        w.document.open();
        w.document.write(t);
        w.document.close();
      }
    });
}

/* ===== BLOB OPEN ===== */
function openBlob(btn) {
  const url = btn.closest(".game-card").dataset.urlBlank;

  fetch(url + "?t=" + Date.now())
    .then(r => r.text())
    .then(t => {
      const blob = new Blob([t], { type: "text/html" });
      window.open(URL.createObjectURL(blob), "_blank");
    });
}
