// Importation de la vue nécessaire
import BaseView from "./baseView.js";

// Je crée la classe UserView pour gérer l’affichage et les interactions sur le profil utilisateur
export default class UserView extends BaseView {

  // Je remplis les informations du profil utilisateur (nom, email, crédits, rôle)
  fillProfile({ pseudo, email, credits, role }) {
    const name = this.get("profileName");
    const mail = this.get("profileEmail");
    const cred = this.get("profileCredits");
    const roleEl = this.get("profileRole");

    if (name) name.textContent = pseudo || "";
    if (mail) mail.textContent = email || "";
    if (cred) cred.textContent = String(credits ?? 0);
    if (roleEl) {
      roleEl.textContent = role
        ? role.charAt(0).toUpperCase() + role.slice(1).replace("-", " & ")
        : "Non défini";
    }
  }

  // J’affiche la liste des réservations de l’utilisateur
  renderReservations(list) {
    const ul = this.get("reservationsList");
    if (!ul) return;

    if (!list || list.length === 0) {
      ul.innerHTML = "<li>Aucune réservation pour le moment.</li>";
      return;
    }

    ul.innerHTML = list
      .map(
        (r) => `
        <li class="reservation-item">
          <div>
            <b>${r.depart} → ${r.arrivee}</b> — 
            ${new Date(r.date).toLocaleDateString("fr-FR")} — 
            ${r.prix} € 
          </div>
          <button class="btn btn-secondary btn-cancel" data-id="${r.trajetId}">
            Annuler
          </button>
        </li>
      `
      )
      .join("");
  }

  // Je gère l’ajout de crédits sur le profil utilisateur
  bindAddCredits(onAdd) {
    const btn = this.get("addCreditsBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const amount = Number(prompt("Montant de crédits à ajouter :", "10"));
      if (amount && amount > 0) onAdd(amount);
    });
  }

  // Je relie les boutons “Annuler” pour permettre la suppression d’une réservation
  bindCancelReservation(handler) {
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-cancel")) {
        const id = e.target.dataset.id;
        handler(id);
      }
    });
  }

  // J’affiche un message visuel temporaire pour informer l’utilisateur (toast)
  showToast(message) {
    const toast = document.createElement("div");
    toast.className = "notify notify-success";
    toast.textContent = message;

    Object.assign(toast.style, {
      position: "fixed",
      bottom: "1.5rem",
      right: "1.5rem",
      backgroundColor: "#27ae60",
      color: "#fff",
      padding: "0.8rem 1.2rem",
      borderRadius: "8px",
      fontWeight: "600",
      boxShadow: "0 3px 6px rgba(0,0,0,0.15)",
      transition: "opacity .5s ease",
      zIndex: 9999,
    });

    document.body.appendChild(toast);
    setTimeout(() => (toast.style.opacity = "0"), 2500);
    setTimeout(() => toast.remove(), 3000);
  }
}
