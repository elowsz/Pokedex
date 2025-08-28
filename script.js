const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const API = (nameOrId) =>
  `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(
    String(nameOrId).toLowerCase().trim()
  )}`;

const form = $("#search-form");
const input = $("#search-input");
const card = $("#card");
const historyList = $("#history-list");
const clearBtn = $("#clear-history");

const tpl = $("#card-template");

const HISTORY_KEY = "pokedex-history-v1";

function setLoading(is) {
  form.querySelector("button").disabled = is;
  form.querySelector("button").textContent = is ? "Buscando..." : "Buscar";
}

function saveHistory(term) {
  const arr = new Set(JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"));
  arr.add(term.toLowerCase());
  localStorage.setItem(HISTORY_KEY, JSON.stringify([...arr].slice(-10))); // últimos 10
  renderHistory();
}

function renderHistory() {
  const arr = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  historyList.innerHTML = "";
  arr.forEach((term) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.textContent = term;
    btn.addEventListener("click", () => {
      input.value = term;
      form.requestSubmit();
    });
    li.appendChild(btn);
    historyList.appendChild(li);
  });
}

async function fetchPokemon(term) {
  setLoading(true);
  try {
    const res = await fetch(API(term), { cache: "no-store" });
    if (!res.ok) throw new Error("Não encontrado");
    const data = await res.json();
    showCard(data);
    saveHistory(term);
  } catch (err) {
    card.classList.remove("hidden");
    card.innerHTML = `
      <article>
        <div class="content">
          <h2>Ops…</h2>
          <p>${err.message || "Algo deu errado"}. Tente outro nome/ID.</p>
        </div>
      </article>`;
  } finally {
    setLoading(false);
  }
}

function showCard(p) {
  card.innerHTML = "";
  const node = tpl.content.cloneNode(true);

  const img = $("#poke-img", node);
  const name = $("#poke-name", node);
  const id = $("#poke-id", node);
  const types = $("#poke-types", node);
  const abilities = $("#poke-abilities", node);
  const stats = $("#poke-stats", node);

  const sprite =
    p.sprites.other?.["official-artwork"]?.front_default ||
    p.sprites.front_default ||
    "";

  img.src = sprite;
  img.alt = `Imagem do Pokémon ${p.name}`;
  name.textContent = capitalize(p.name);
  id.textContent = `#${p.id}`;

  types.innerHTML = "";
  p.types.forEach((t) => {
    const div = document.createElement("span");
    div.className = "chip";
    div.textContent = t.type.name;
    types.appendChild(div);
  });

  abilities.innerHTML = "";
  p.abilities.forEach((a) => {
    const li = document.createElement("li");
    li.textContent = (a.ability?.name || "").replace("-", " ");
    abilities.appendChild(li);
  });

  stats.innerHTML = "";
  p.stats.forEach((s) => {
    const wrap = document.createElement("div");
    wrap.className = "stat";
    const label = document.createElement("span");
    label.textContent = niceStat(s.stat.name);
    const value = document.createElement("strong");
    value.textContent = s.base_stat;
    wrap.append(label, value);
    stats.appendChild(wrap);
  });

  card.appendChild(node);
  card.classList.remove("hidden");
}

function niceStat(key) {
  const map = {
    hp: "HP",
    attack: "Ataque",
    defense: "Defesa",
    "special-attack": "Atk Esp.",
    "special-defense": "Def Esp.",
    speed: "Velocidade",
  };
  return map[key] || key;
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// eventos
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const term = input.value.trim();
  if (!term) return;
  fetchPokemon(term);
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
});

// render inicial
renderHistory();
// busca inicial opcional
fetchPokemon("pikachu");
