// Importation des modèles et vues nécessaires
import UserModel from "../models/userModel.js";
import UserView from "../views/userView.js";
import { getCurrentUser, clearCurrentUser } from "../utils/auth.js";
import ReservationModel from "../models/reservationModel.js";
import TrajetModel from "../models/trajetModel.js";

// Je crée la classe UserController pour gérer le profil utilisateur et ses actions
export default class UserController {
  constructor() {
    this.view = new UserView();
  }

  // Je calcule automatiquement un pseudo à partir des informations disponibles de l’utilisateur
  _computePseudo(u) {
    const fromNames =
      (u.prenom && u.nom && `${u.prenom} ${u.nom}`) ||
      u.prenom ||
      u.nom ||
      null;
    const fromEmail = u.email ? u.email.split("@")[0] : null;
    return u.pseudo || u.username || fromNames || fromEmail || "Utilisateur";
  }

  // J’initialise la page de profil utilisateur
  initProfile() {
    console.log("[user] init profile");

    const session = getCurrentUser();
    if (!session) {
      console.warn("[user] no session -> redirect to login");
      window.location.href = "./login.php";
      return;
    }

    const user = UserModel.findById(session.id);
    if (!user) {
      console.warn("[user] user not found -> redirect to login");
      window.location.href = "./login.php";
      return;
    }

    const pseudo = this._computePseudo(user);

    // Je complète le pseudo s’il est manquant et je le sauvegarde
    if (!user.pseudo) {
      user.pseudo = pseudo;
      UserModel.save(user);
      console.log("[user] pseudo was missing, saved as:", pseudo);
    }

    // Je remplis la vue du profil utilisateur
    this.view.fillProfile({
      pseudo,
      email: user.email || "",
      credits: user.credits ?? 0,
      role: user.roleCovoit || null,
    });

    // J’affiche la section de choix du rôle si besoin
    this._initRoleSelector(user);

    // J’affiche la section véhicule si applicable
    this._initVehiculeSection(user);

    // Je récupère et j’affiche les réservations de l’utilisateur
    const reservations = ReservationModel.findByUser(user.id).map((r) => {
      const trajet = TrajetModel.findById(r.trajetId);
      return {
        ...r,
        depart: trajet?.depart || "?",
        arrivee: trajet?.arrivee || "?",
      };
    });

    this.view.renderReservations(reservations);

    // Je gère l’annulation d’une réservation
    this.view.bindCancelReservation((trajetId) => {
      if (!confirm("Voulez-vous annuler cette réservation ?")) return;

      const all = ReservationModel.all().filter(
        (r) =>
          !(
            Number(r.userId) === Number(user.id) &&
            Number(r.trajetId) === Number(trajetId)
          )
      );
      localStorage.setItem("reservations", JSON.stringify(all));

      TrajetModel.removeParticipant(trajetId, user.id);

      this.view.showToast("Réservation annulée !");
      this.initProfile();
    });

    // Je gère l’ajout de crédits à l’utilisateur
    this.view.bindAddCredits((amount) => {
      const all = UserModel.getAll();
      const idx = all.findIndex((u) => Number(u.id) === Number(user.id));
      if (idx !== -1) {
        all[idx].credits = Number(all[idx].credits || 0) + Number(amount);
        localStorage.setItem("users", JSON.stringify(all));
        this.view.fillProfile({
          pseudo: this._computePseudo(all[idx]),
          email: all[idx].email || "",
          credits: all[idx].credits ?? 0,
          role: all[idx].roleCovoit || null,
        });
        this.view.showToast("Crédits ajoutés !");
      }
    });

    // Je gère la déconnexion
    this._bindLogout();
  }

  // Je gère la logique du choix de rôle
  _initRoleSelector(user) {
    const roleSection = document.getElementById("roleChooser");
    const roleForm = document.getElementById("roleForm");
    const vehiculeSection = document.getElementById("vehiculeSection");

    if (!roleSection || !roleForm) return;

    // Si l’utilisateur a déjà choisi un rôle, je cache définitivement la section
    if (user.roleCovoit) {
      roleSection.style.display = "none";
    } else {
      // Sinon, j’affiche la section rôle
      roleSection.style.display = "block";
    }

    // Si l’utilisateur a déjà un rôle, je le pré-sélectionne et j’affiche le véhicule si besoin
    if (user.roleCovoit) {
      const radio = roleForm.querySelector(
        `input[name="roleCovoit"][value="${user.roleCovoit}"]`
      );
      if (radio) radio.checked = true;

      if (
        user.roleCovoit === "chauffeur" ||
        user.roleCovoit === "passager-chauffeur"
      ) {
        vehiculeSection.style.display = "block";
      }
    }

    // Je gère la soumission du formulaire de rôle
    roleForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const selected = roleForm.querySelector("input[name='roleCovoit']:checked");
      if (!selected) {
        alert("Veuillez choisir un rôle.");
        return;
      }

      const newRole = selected.value;
      user.roleCovoit = newRole;
      UserModel.save(user);

      // Mise à jour immédiate du rôle affiché sur le profil
      this.view.fillProfile({
        pseudo: user.pseudo,
        email: user.email,
        credits: user.credits,
        role: newRole,
      });

      // Je masque la section de choix après validation (définitivement)
      roleSection.style.display = "none";

      // J’affiche la section véhicule uniquement si besoin
      vehiculeSection.style.display =
        newRole === "chauffeur" || newRole === "passager-chauffeur"
          ? "block"
          : "none";

      this.view.showToast("Rôle enregistré avec succès !");
    });
  }

  // Je gère le formulaire véhicule (affichage et enregistrement)
  
    // Je gère le formulaire véhicule (affichage et enregistrement)
  _initVehiculeSection(user) {
    const form = document.getElementById("vehiculeForm");
    const list = document.getElementById("vehiculeList");
    const vehiculeSection = document.getElementById("vehiculeSection");

    if (!vehiculeSection || !form || !list) return;

    // Si pas chauffeur -> je cache la section
    if (
      user.roleCovoit !== "chauffeur" &&
      user.roleCovoit !== "passager-chauffeur"
    ) {
      vehiculeSection.style.display = "none";
      return;
    }

    // Fonction interne pour afficher les véhicules
    const renderVehicules = () => {
      const vehicules = user.vehicules || [];
      if (!vehicules.length) {
        list.innerHTML = "<li>Aucun véhicule enregistré</li>";
        return;
      }

      list.innerHTML = vehicules
        .map(
          (v, i) => `
          <li data-index="${i}" style="margin-bottom: 0.5em;">
            <b>${v.marque}</b> ${v.modele} (${v.couleur || "Couleur inconnue"}) - ${v.plaque}
            <br>
            <small>${v.energie} — ${v.places} places — ${v.dateImmat || "Date inconnue"}</small>
            <br>
            <button class="btn btn-secondary btn-delete-vehicule" data-index="${i}">
              Supprimer
            </button>
          </li>
        `
        )
        .join("");
    };

    // Je lance un affichage initial
    renderVehicules();

    // Je gère la soumission du formulaire véhicule
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const newVehicule = {
        marque: form.vehMarque.value.trim(),
        modele: form.vehModele.value.trim(),
        couleur: form.vehCouleur.value.trim(),
        plaque: form.vehPlaque.value.trim(),
        dateImmat: form.vehDateImmat.value,
        energie: form.vehEnergie.value.trim(),
        places: Number(form.vehPlaces.value),
      };

      if (!newVehicule.marque || !newVehicule.modele || !newVehicule.plaque) {
        alert("Merci de remplir les champs obligatoires.");
        return;
      }

      user.vehicules = user.vehicules || [];
      user.vehicules.push(newVehicule);
      UserModel.save(user);

      renderVehicules();
      form.reset();
      this.view.showToast("Véhicule ajouté !");
    });

    // Je gère la suppression d’un véhicule
    list.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-delete-vehicule")) {
        const index = Number(e.target.dataset.index);
        if (!isNaN(index)) {
          if (confirm("Voulez-vous vraiment supprimer ce véhicule ?")) {
            user.vehicules.splice(index, 1);
            UserModel.save(user);
            renderVehicules();
            this.view.showToast("Véhicule supprimé !");
          }
        }
      }
    });
  }



  // Je gère le bouton de déconnexion
  _bindLogout() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Je vide la session (version compatible avec ton système)
      clearCurrentUser();

      this.view.showToast("Déconnexion réussie !");
      setTimeout(() => (window.location.href = "./login.php"), 800);
    });
  }
}
