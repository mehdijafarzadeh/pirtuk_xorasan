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

// Accepts any Google Drive share link (or a bare file ID) and returns the file ID.
//   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
//   https://drive.google.com/open?id=FILE_ID
//   FILE_ID
function driveId(link) {
  if (!link) return "";
  const m = link.match(/\/d\/([\w-]{10,})/) || link.match(/[?&]id=([\w-]{10,})/);
  if (m) return m[1];
  return /^[\w-]{10,}$/.test(link.trim()) ? link.trim() : "";
}

const driveStreamUrl = (id) => `https://drive.google.com/uc?export=download&id=${id}`;
const drivePreviewUrl = (id) => `https://drive.google.com/file/d/${id}/preview`;
const driveViewUrl = (id) => `https://drive.google.com/file/d/${id}/view`;

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
