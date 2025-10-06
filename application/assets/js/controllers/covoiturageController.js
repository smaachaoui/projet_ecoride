// Je gère la recherche, les filtres et l'affichage des cartes de covoiturage
const STORAGE_KEYS = ["driversSeeded", "drivers"];

// Je crée une variable pour stocker les données importées
let SEED = [];

// Je normalise une chaîne de texte (Modèle)
const norm = (s) => String(s || "").trim().toLowerCase();

// Je crée une carte HTML pour afficher un trajet (Vue)
function card(t) {
  const href = "./detail.php?id=" + encodeURIComponent(t.id);
  return `
    <article class="container_card">
      <img src="${'../assets/img/user_picture.png'}" 
           alt="${t.pseudo || 'Chauffeur'}" 
           class="driver-photo" 
           style="width:80px;height:80px;border-radius:50%;object-fit:cover"/>
      <h3 style="color:black;margin:.5rem 0">${t.pseudo || "Chauffeur"}</h3>
      <p style="color:black"><strong>${t.depart}</strong> → <strong>${t.arrivee}</strong></p>
      <p style="color:black">Départ : ${t.date} ${t.heure || ""}</p>
      <p style="color:black">Places restantes : ${t.places}</p>
      <p style="color:black">Prix : ${t.prix} €</p>
      <p style="color:black">Note : ${t.note}</p>
      <p style="color:black">${t.eco ? ' Voyage écologique' : ' Véhicule thermique'}</p>
      <a href="${href}" class="btn" style="margin-top:.5rem">Détail</a>
    </article>`;
}

// Je lis les données stockées localement (Modèle)
function loadAll() {
  for (const key of STORAGE_KEYS) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Je passe à la clé suivante si erreur
    }
  }
  return null;
}

// Je sauvegarde les données dans le localStorage (Modèle)
function saveAll(list) {
  localStorage.setItem(STORAGE_KEYS[0], JSON.stringify(list));
  localStorage.removeItem("drivers");
}

// Je définis le contrôleur principal du covoiturage
export default class CovoiturageController {
  constructor() {
    this.data = [];
    this.lastResults = [];
  }

  // Je charge les données de base (Modèle)
  async _importSeed() {
    if (SEED.length) return SEED;

    // Je créer une constante avec les chemins possibles vers les fichiers de données des conducteurs
    const candidates = [
      "../../data/driver.js",
      "../../../data/driver.js",
      "../../data/drivers.js",
      "../../../data/drivers.js",
    ];


    // Pour chaque chemin, j'essaie de l'importer dynamiquement
    for (const path of candidates) {
      try {
        const mod = await import(path);
        let list = null;

        if (Array.isArray(mod?.drivers)) list = mod.drivers;
        else if (Array.isArray(mod?.default)) list = mod.default;
        else if (Array.isArray(mod?.default?.drivers)) list = mod.default.drivers;

        if (list && list.length) {
          SEED = list;
          console.log("[covoit] seed loaded from", path, "len=", list.length);
          return SEED;
        }
      } catch {
        // Je continue si le fichier n’est pas trouvé
      }
    }

    // Je crée un fallback minimal si rien n’est trouvé
    SEED = [
      { id: 1, pseudo: "Alex", depart: "Paris", arrivee: "Lyon", date: "2025-10-10", heure: "08:00", places: 3, prix: 30, eco: true,  note: 4.7 },
      { id: 2, pseudo: "Sara", depart: "Paris", arrivee: "Lyon", date: "2025-10-10", heure: "10:00", places: 2, prix: 28, eco: false, note: 4.2 },
    ];
    console.warn("[covoit] Fallback seed used (vérifie /application/assets/data/driver.js)");
    return SEED;
  }

  // Je vérifie et prépare les données à afficher (Modèle)
  async _ensureData() {
    const existing = loadAll();
    if (existing?.length) {
      this.data = existing;
      console.log("[covoit] Loaded from localStorage:", existing.length);
      return;
    }

    const seed = await this._importSeed();
    saveAll(seed);
    this.data = [...seed];
    console.log("[covoit] Seeded from data:", seed.length);
  }

  // Je récupère un élément DOM par son id (Vue)
  _get(...ids) {
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) return el;
    }
    return null;
  }

  // J’initialise la recherche et les filtres (Contrôleur)
  async initList() {
    await this._ensureData();

    const form = this._get("searchForm", "covoiturageForm");
    const results = this._get("results", "trajetsContainer");
    const btnFilters = this._get("applyFilters");

    if (!form || !results) {
      console.warn("[covoit] missing form/results");
      return;
    }

    results.classList.add("grid-results");

    // Je préremplis le formulaire depuis les paramètres de l’URL
    const params = new URLSearchParams(window.location.search);
    const dep  = params.get("departure");
    const dest = params.get("destination");
    const date = params.get("date");

    if (dep)  this._get("departure").value = dep;
    if (dest) this._get("destination").value = dest;
    if (date) this._get("date").value = date;

    // Je définis la fonction de recherche
    const doSearch = () => {
      const from = this._get("departure")?.value || "";
      const to   = this._get("destination")?.value || "";
      const d    = this._get("date")?.value || "";

      console.log("[covoit] search submit", { from, to, date: d });

      const sameDate = (tDate) => !d || String(tDate || "").slice(0, 10) === d;

      const base = this.data.filter(t =>
        norm(t.depart)  === norm(from) &&
        norm(t.arrivee) === norm(to)   &&
        Number(t.places) > 0           &&
        sameDate(t.date)
      );

      if (base.length) {
        this.lastResults = base;
        results.innerHTML = base.map(card).join("");
        return;
      }

      // Je propose un trajet futur si aucune correspondance exacte
      const future = this.data
        .filter(t => norm(t.depart) === norm(from) && norm(t.arrivee) === norm(to) && Number(t.places) > 0)
        .sort((a,b)=> new Date(`${a.date} ${a.heure||"00:00"}`) - new Date(`${b.date} ${b.heure||"00:00"}`));

      if (future.length) {
        this.lastResults = [future[0]];
        results.innerHTML = `<p>Aucun chauffeur à la date choisie. Proposition :</p>${card(future[0])}`;
      } else {
        this.lastResults = [];
        results.innerHTML = `<p>Aucun chauffeur trouvé pour ces critères.</p>`;
      }
    };

      // Je gère la soumission du formulaire
      form.addEventListener("submit", (e) => { e.preventDefault(); doSearch(); });
      if (dep || dest || date) {
        doSearch();
      } else {
        // 👇 Ici on affiche tous les conducteurs par défaut
        this.lastResults = [...this.data];
        results.innerHTML = this.data.map(card).join("");
        console.log("[covoit] affichage par défaut de tous les conducteurs :", this.data.length);
      }
      
    // Je gère l’application des filtres
    if (btnFilters) {
      btnFilters.addEventListener("click", () => {
        if (!this.lastResults.length) {
          results.innerHTML = `<p>Aucun résultat à filtrer. Lance d'abord une recherche.</p>`;
          return;
        }

        const ecoOnly  = !!this._get("filterEco")?.checked;
        const maxPrice = Number(this._get("filterPrice")?.value || NaN);
        const maxDur   = Number(this._get("filterDuration")?.value || NaN);
        const minNote  = Number(this._get("filterNote")?.value || NaN);

        console.log("[covoit] applying filters", { ecoOnly, maxPrice, maxDur, minNote });

        let filtered = [...this.lastResults];
        if (ecoOnly) filtered = filtered.filter(t => !!t.eco);
        if (!Number.isNaN(maxPrice)) filtered = filtered.filter(t => Number(t.prix) <= maxPrice);
        if (!Number.isNaN(maxDur))   filtered = filtered.filter(t => Number(t.duree || 0) <= maxDur);
        if (!Number.isNaN(minNote))  filtered = filtered.filter(t => Number(t.note  || 0) >= minNote);

        results.innerHTML = filtered.length
          ? filtered.map(card).join("")
          : `<p>Aucun résultat après application des filtres.</p>`;
      });
    }
  }
}
