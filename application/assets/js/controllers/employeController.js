// Importation des modèles et vues nécessaires
import TrajetModel from "../models/trajetModel.js";
import UserModel from "../models/userModel.js";
import BaseView from "../views/baseView.js";
import ReviewModel from "../models/reviewModel.js";

// Je crée la classe EmployeController pour gérer le tableau de bord des employés
export default class EmployeController {
  constructor() {
    this.view = new BaseView();
  }

  // J’initialise le tableau de bord employé avec les trajets et utilisateurs
  initDashboard() {
    console.log("[employe] init dashboard");

    const list = TrajetModel.getAll();
    const users = UserModel.getAll();

    // Je filtre les trajets à venir en fonction de la date et de l’heure
    const upcoming = list.filter(t => new Date(`${t.date} ${t.heure || "00:00"}`) >= new Date());

    // J’affiche la liste des trajets à venir et des utilisateurs dans la vue
    const el = this.view.get("employeData");
    if (el) {
      el.innerHTML = `
        <h3>Trajets à venir (${upcoming.length})</h3>
        <ul>${upcoming.map(t => `<li>#${t.id} ${t.depart} → ${t.arrivee} le ${t.date} (${t.places} places)</li>`).join("")}</ul>
        <h3>Utilisateurs (${users.length})</h3>
        <ul>${users.map(u => `<li>#${u.id} ${u.pseudo} — ${u.email} — ${u.role}</li>`).join("")}</ul>
      `;
    }

    // Je mets à jour les tableaux de modération et des trajets signalés
    this.renderModeration();
  }

  // Je gère l’affichage et la modération des avis et trajets signalés
  renderModeration() {
    const pending = ReviewModel.pending();
    const tbody = document.querySelector("#empReviews tbody");

    // J’affiche la liste des avis en attente de validation
    if (tbody) {
      tbody.innerHTML = pending.map(r => `
        <tr data-id="${r.id}">
          <td>#${r.trajetId}</td>
          <td>${r.chauffeurPseudo || "Chauffeur"}</td>
          <td>${r.passagerPseudo || "Passager"}</td>
          <td>${r.note ?? "—"}</td>
          <td>${r.comment || ""}</td>
          <td class="actions">
            <button class="btn" data-act="approve" data-id="${r.id}">Valider</button>
            <button class="btn" data-act="reject" data-id="${r.id}">Refuser</button>
          </td>
        </tr>
      `).join("");

      // Je gère les actions de validation des avis
      tbody.querySelectorAll('[data-act="approve"]').forEach(b => {
        b.addEventListener("click", () => {
          ReviewModel.approve(Number(b.dataset.id));
          this.renderModeration();
        });
      });

      // Je gère les actions de refus des avis
      tbody.querySelectorAll('[data-act="reject"]').forEach(b => {
        b.addEventListener("click", () => {
          ReviewModel.reject(Number(b.dataset.id));
          this.renderModeration();
        });
      });
    }

    // J’affiche la liste des trajets signalés
    const flagged = ReviewModel.flagged();
    const tbody2 = document.querySelector("#empBadTrips tbody");

    if (tbody2) {
      tbody2.innerHTML = flagged.map(r => `
        <tr>
          <td>#${r.trajetId}</td>
          <td>${r.passagerEmail || ""}</td>
          <td>${r.chauffeurEmail || ""}</td>
          <td>${r.date || ""}</td>
          <td>${r.depart || ""} → ${r.arrivee || ""}</td>
          <td>${r.comment || ""}</td>
        </tr>
      `).join("");
    }
  }
}
