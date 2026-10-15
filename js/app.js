// Shared code for all pages. No build step, no libraries.

const DATA_URL = "data/exercises.json";

// Load the exercise list. "no-cache" makes edits to the JSON show up quickly.
async function loadData() {
  const res = await fetch(DATA_URL, { cache: "no-cache" });
  if (!res.ok) throw new Error("Could not load " + DATA_URL);
  return res.json();
}

// Flatten units -> one list of exercises, each knowing its unit.
function allExercises(data) {
  const list = [];
  for (const unit of data.units) {
    for (const ex of unit.exercises) list.push({ ...ex, unit });
  }
  return list;
}

// The permanent, shareable address of one exercise (used for QR codes).
function exerciseUrl(id) {
  return new URL("listen.html?id=" + encodeURIComponent(id), location.href).href;
}

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  for (const c of children) if (c) node.append(c);
  return node;
}

function showError(container, message) {
  container.replaceChildren(el("p", { class: "notice", text: message }));
}

function setSiteTitle(data) {
  const title = data.site?.title || "Audio";
  document.querySelectorAll("[data-site-title]").forEach((n) => (n.textContent = title));
  const sub = document.querySelector("[data-site-subtitle]");
  if (sub) sub.textContent = data.site?.subtitle || "";
}

// Small inline icons (Lucide-style line icons). icon("play") returns a <span> holding the SVG.
const ICONS = {
  play: '<path d="M7 4.5v15l13-7.5z" fill="currentColor" stroke="none"/>',
  pause: '<rect x="6" y="4.5" width="4" height="15" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="4.5" width="4" height="15" rx="1" fill="currentColor" stroke="none"/>',
  back5: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
  text: '<path d="M4 6h16M4 12h16M4 18h10"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  print: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
};
function icon(name, cls = "icon") {
  const span = document.createElement("span");
  span.className = cls;
  span.setAttribute("aria-hidden", "true");
  span.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
  return span;
}

function formatTime(sec) {
  if (!isFinite(sec)) return "--:--";
  const s = Math.floor(sec);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
