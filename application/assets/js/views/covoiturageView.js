// Importation de la vue nécessaire
import BaseView from "./baseView.js";

// Je crée la classe CovoiturageView pour gérer l’affichage et les interactions liées aux trajets
export default class CovoiturageView extends BaseView {

  // Je relie le formulaire de recherche de covoiturage et j’exécute la fonction onSearch
  bindSearch(onSearch) {
    const form = this.get("searchForm") || this.get("covoiturageForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const from = this.get("departure")?.value || "";
      const to = this.get("destination")?.value || "";
      const date = this.get("date")?.value || "";
      onSearch({ from, to, date });
    });
  }

  // Je relie le bouton de filtres et j’exécute la fonction onApply lorsque l’utilisateur applique les filtres
  bindFilters(onApply) {
    const btn = this.get("applyFilters");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const ecoOnly = this.get("filterEco")?.checked === true;
      const maxPrice = this.get("filterPrice")?.value ? Number(this.get("filterPrice").value) : null;
      const maxDur = this.get("filterDuration")?.value ? Number(this.get("filterDuration").value) : null;
      const minNote = this.get("filterNote")?.value ? Number(this.get("filterNote").value) : null;

      onApply({ ecoOnly, maxPrice, maxDur, minNote });
    });
  }

  // J’affiche une liste de trajets sous forme de cartes dans le conteneur donné
  renderCards(containerId, list) {
    const el = this.get(containerId) || this.get("trajetsContainer");
    if (!el) return;
    el.innerHTML = list.map(t => this.card(t)).join("");
  }

  // J’affiche un message dans le conteneur, avec ou sans proposition alternative
  renderMessage(containerId, message, suggestion) {
    const el = this.get(containerId) || this.get("trajetsContainer");
    if (!el) return;

    el.innerHTML = suggestion
      ? `<p>${message}</p>${this.card(suggestion)}`
      : `<p>${message}</p>`;
  }

  // Je génère le code HTML représentant une carte de trajet
  card(t) {
    return `
      <div class="trajet-card">
        <div class="trajet-header">
          <img src="${'../assets/img/user_picture.png'}" alt="${t.pseudo}" class="driver-photo"/>
          <div>
            <h3>${t.pseudo}</h3>
            <p>Note :  ${t.note ?? "N/A"}</p>
          </div>
        </div>
        <div class="trajet-body">
          <p><strong>${t.depart}</strong> → <strong>${t.arrivee}</strong></p>
          <p>Départ : ${t.date} ${t.heure || ""}</p>
          <p>Places restantes : ${t.places}</p>
          <p>Prix : ${t.prix} €</p>
          <p>${t.eco ? " Voyage écologique" : " Véhicule thermique"}</p>
        </div>
        <div class="trajet-footer">
          <a href="./detail.php?id=${t.id}" class="btn-detail">Détail</a>
        </div>
      </div>`;
  }
}
