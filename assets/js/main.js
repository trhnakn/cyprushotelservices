const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const chips = Array.from(document.querySelectorAll(".chip"));
const cards = Array.from(document.querySelectorAll(".card"));

let activeTag = "all";
let query = "";

function normalize(s){
  return (s || "").toLowerCase().trim();
}

function applyFilters(){
  const q = normalize(query);

  cards.forEach(card => {
    const title = normalize(card.dataset.title);
    const tags = normalize(card.dataset.tags);

    const matchQuery = !q || title.includes(q);
    const matchTag = (activeTag === "all") || tags.includes(activeTag);

    card.style.display = (matchQuery && matchTag) ? "" : "none";
  });
}

chips.forEach(btn => {
  btn.addEventListener("click", () => {
    chips.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    activeTag = btn.dataset.tag;
    applyFilters();
  });
});

if (searchInput){
  searchInput.addEventListener("input", (e) => {
    query = e.target.value;
    applyFilters();
  });
}

if (clearBtn){
  clearBtn.addEventListener("click", () => {
    query = "";
    if (searchInput) searchInput.value = "";
    applyFilters();
  });
}

